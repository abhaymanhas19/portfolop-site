import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'

const highlights = [
  'OpenAI API Integrations',
  'Azure Cloud Automation',
  'OpenAI Response APIs',
  'Batch Processing Pipelines',
  'Azure OpenAI Deployments',
  'Azure Workflow Orchestration',
]

export default function CapabilityTicker() {
  const marqueeItems = useMemo(() => [...highlights, ...highlights], [])
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="relative overflow-hidden border-y border-slate-200 bg-slate-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-2">
        <span className="tag-pill px-3 py-1 text-[10px] tracking-[0.32em]">
          <Sparkles className="h-3.5 w-3.5" /> AI Focus
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />
          <div
            className="logo-loop-track flex w-max items-center gap-8 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-600"
            style={{ animationDuration: '26s', animationPlayState: paused ? 'paused' : 'running' }}
          >
            {marqueeItems.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
