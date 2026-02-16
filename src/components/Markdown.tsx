import { ReactNode } from 'react'

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'paragraph'; text: string }

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
  let list: string[] | null = null

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
      paragraph = []
    }
  }

  const flushList = () => {
    if (list && list.length) {
      blocks.push({ type: 'list', items: list })
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

    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] })
      continue
    }

    const listItem = line.match(/^[-*+]\s+(.*)$/)
    if (listItem) {
      flushParagraph()
      if (!list) list = []
      list.push(listItem[1])
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

export default function Markdown({ content }: Props) {
  const blocks = parseMarkdown(content)

  return (
    <div className="prose prose-slate max-w-none text-base leading-relaxed md:text-lg prose-headings:text-slate-900 prose-strong:text-slate-900">
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          const Tag = (`h${Math.min(block.level, 3)}` as keyof JSX.IntrinsicElements)
          return <Tag key={`h-${idx}`}>{renderInline(block.text, `h-${idx}`)}</Tag>
        }

        if (block.type === 'list') {
          return (
            <ul key={`ul-${idx}`}>
              {block.items.map((item, itemIdx) => (
                <li key={`li-${idx}-${itemIdx}`}>{renderInline(item, `li-${idx}-${itemIdx}`)}</li>
              ))}
            </ul>
          )
        }

        return <p key={`p-${idx}`}>{renderInline(block.text, `p-${idx}`)}</p>
      })}
    </div>
  )
}
