import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
}

export default function Markdown({ content }: Props) {
  return (
    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-[#005bc4] prose-img:rounded-xl">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-10 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-8 mb-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-2" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-lg md:text-xl font-semibold text-slate-900 mt-5 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="leading-relaxed text-slate-700 mb-5" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc ml-5 space-y-2 mb-5 text-slate-700" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal ml-5 space-y-2 mb-5 text-slate-700" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          a: ({node, ...props}) => <a className="text-[#005bc4] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-5" {...props} />,
          hr: ({node, ...props}) => <hr className="my-8 border-slate-200" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
