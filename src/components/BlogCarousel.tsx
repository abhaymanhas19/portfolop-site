import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useBlogs } from '../hooks/useBlogs'

export default function BlogCarousel() {
  const { blogs, loading, error } = useBlogs()
  const featured = useMemo(() => blogs.slice(0, 4), [blogs])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!featured.length) return
    const timer = setInterval(() => setIndex(i => (i + 1) % featured.length), 5200)
    return () => clearInterval(timer)
  }, [featured.length])

  useEffect(() => {
    if (index >= featured.length && featured.length > 0) {
      setIndex(0)
    }
  }, [featured.length, index])

  const goto = (next: number) => {
    const normalized = (next + featured.length) % featured.length
    setIndex(normalized)
  }

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-slate-600">Loading blogs...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  if (!featured.length) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-slate-600">No blogs available yet.</p>
        </div>
      </section>
    )
  }

  const active = featured[index]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50 py-16">
      <div className="absolute inset-x-10 top-10 h-48 rounded-full bg-white/80 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              <Sparkles className="h-4 w-4" /> Study Blogs
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Learning in public</h2>
            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
              Short writeups on the experiments, guardrails, and engineering moves I am practicing right now.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/blogs" className="btn-primary px-4 py-2 text-sm">View all blogs</Link>
            <Link to={`/blogs/${active.slug}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200">
              Read detail <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,0.9fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_32px_90px_rgba(16,185,129,0.16)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="grid h-full gap-6 md:grid-cols-[1.1fr,0.9fr] md:items-center"
              >
                <div className="h-full w-full overflow-hidden">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="h-full w-full object-cover"
                    style={{ aspectRatio: '4 / 3' }}
                    loading="lazy"
                  />
                </div>
                <div className="flex h-full flex-col gap-3 px-6 py-6 md:py-10">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                    <BookOpen className="h-4 w-4" /> {active.category}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{active.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{active.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {active.skills.map(skill => (
                      <span key={skill} className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4 pt-2">
              <div className="flex gap-2 text-sm text-slate-500">
                <span>{active.publishedAt}</span>
                <span>•</span>
                <span>{active.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goto(index - 1)}
                  className="rounded-full border border-slate-200 bg-white/90 p-2 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
                  aria-label="Previous blog"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goto(index + 1)}
                  className="rounded-full border border-slate-200 bg-white/90 p-2 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
                  aria-label="Next blog"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {featured.map((blog, idx) => (
              <button
                key={blog.slug}
                onClick={() => goto(idx)}
                className={`w-full rounded-[22px] border px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white shadow-sm ${
                  idx === index
                    ? 'border-emerald-200 bg-white'
                    : 'border-slate-200/80 bg-white/80 text-slate-600'
                }`}
                aria-current={idx === index}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">{blog.category}</p>
                    <p className="text-sm font-semibold text-slate-900">{blog.title}</p>
                    <p className="text-xs text-slate-500">{blog.readTime} • {blog.publishedAt}</p>
                  </div>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-16 w-20 rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
