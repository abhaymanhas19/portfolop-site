import { ReactNode } from 'react'

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; text: string }
  | { type: 'hr' }

// Lightweight inline formatter supporting **bold** and *italic* text.
const INLINE_REGEX = /(\*\*[^*]+\*\*|\*[^*]+\*)/

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let remaining = text
  let safety = 0

  while (remaining && safety < 2000) {
    const match = remaining.match(INLINE_REGEX)
    if (!match || match.index === undefined) {
      nodes.push(remaining)
      break
    }

    const { index } = match
    const [full] = match

    if (index > 0) nodes.push(remaining.slice(0, index))

    const isBold = full.startsWith('**')
    const content = full.slice(isBold ? 2 : 1, full.length - (isBold ? 2 : 1))
    nodes.push(isBold ? <strong key={`${keyPrefix}-b-${safety}`}>{content}</strong> : <em key={`${keyPrefix}-i-${safety}`}>{content}</em>)

    remaining = remaining.slice(index + full.length)
    safety += 1
  }

  return nodes
}

function parseMarkdown(md: string): Block[] {
  const lines = md.split(/\r?\n/)
  const blocks: Block[] = []
  let paragraph: string[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
      paragraph = []
    }
  }

  const flushList = () => {
    if (list && list.items.length) {
      blocks.push({ type: 'list', ordered: list.ordered, items: list.items })
      list = null
    }
  }

  for (const raw of lines) {
    const line = raw.trim()

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (/^-{3,}$/.test(line)) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'hr' })
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      continue
    }

    const unordered = line.match(/^[-*+]\s+(.*)$/)
    if (unordered) {
      flushParagraph()
      if (!list || list.ordered) list = { ordered: false, items: [] }
      list.items.push(unordered[1])
      continue
    }

    const ordered = line.match(/^\d+\.\s+(.*)$/)
    if (ordered) {
      flushParagraph()
      if (!list || !list.ordered) list = { ordered: true, items: [] }
      list.items.push(ordered[1])
      continue
    }

    if (list) flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  return blocks
}

type Props = {
  content: string
}

const headingClasses: Record<number, string> = {
  1: 'text-3xl md:text-4xl font-semibold text-slate-900 mt-10 mb-4',
  2: 'text-2xl md:text-3xl font-semibold text-slate-900 mt-8 mb-3',
  3: 'text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-2',
  4: 'text-lg md:text-xl font-semibold text-slate-900 mt-5 mb-2',
  5: 'text-base font-semibold text-slate-900 mt-4 mb-2',
  6: 'text-base font-semibold text-slate-900 mt-4 mb-2'
}

export default function Markdown({ content }: Props) {
  const blocks = parseMarkdown(content)

  return (
    <div className="space-y-5 text-base leading-relaxed text-slate-700 md:text-lg">
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          const level = Math.min(block.level, 6)
          const Tag = (`h${level}` as keyof JSX.IntrinsicElements)
          return (
            <Tag key={`h-${idx}`} className={headingClasses[level]}>
              {renderInline(block.text, `h-${idx}`)}
            </Tag>
          )
        }

        if (block.type === 'list') {
          const ListTag = (block.ordered ? 'ol' : 'ul') as keyof JSX.IntrinsicElements
          return (
            <ListTag
              key={`list-${idx}`}
              className={`ml-5 space-y-2 ${block.ordered ? 'list-decimal' : 'list-disc'}`}
            >
              {block.items.map((item, itemIdx) => (
                <li key={`li-${idx}-${itemIdx}`} className="pl-1">
                  {renderInline(item, `li-${idx}-${itemIdx}`)}
                </li>
              ))}
            </ListTag>
          )
        }

        if (block.type === 'hr') {
          return <hr key={`hr-${idx}`} className="my-8 border-slate-200" />
        }

        return (
          <p key={`p-${idx}`} className="leading-relaxed text-slate-700">
            {renderInline(block.text, `p-${idx}`)}
          </p>
        )
      })}
    </div>
  )
}
