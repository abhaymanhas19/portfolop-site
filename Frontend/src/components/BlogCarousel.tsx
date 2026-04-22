import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useBlogs } from '../hooks/useBlogs'

export default function BlogCarousel() {
  const { blogs, loading, error } = useBlogs()
  const navigate = useNavigate()
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
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-[#565e74]">Loading blogs...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  if (!featured.length) {
    return (
      <section className="relative overflow-hidden bg-surface py-16">
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <p className="text-[#565e74]">No blogs available yet.</p>
        </div>
      </section>
    )
  }

  const active = featured[index]

  return (
    <section className="relative overflow-hidden bg-surface-container-low py-ds-16">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 text-left">
            <span className="tag-pill">
              <Sparkles className="h-4 w-4" /> Study Blogs
            </span>
            <h2 className="font-display text-display-md font-semibold text-[#2a3439]">Learning in public</h2>
            <p className="max-w-2xl text-body-lg text-[#565e74]">
              Short writeups on the experiments, guardrails, and engineering moves I am practicing right now.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/blogs" className="btn-primary px-4 py-2 text-sm">View all blogs</Link>
            <Link to={`/blogs/${active.slug}`} className="btn-secondary px-4 py-2 text-sm">
              Read detail <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr,0.9fr]">
          <div
            className="relative overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/blogs/${active.slug}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigate(`/blogs/${active.slug}`)
              }
            }}
          >
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
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#005bc4]">
                    <BookOpen className="h-4 w-4" /> {active.category}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#2a3439]">{active.title}</h3>
                  <p className="text-sm leading-relaxed text-[#565e74]">{active.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#565e74]">
                    {active.skills.map(skill => (
                      <span key={skill} className="rounded-full bg-surface-container-low px-3 py-1 text-[#005bc4]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4 pt-2">
              <div className="flex gap-2 text-sm text-[#565e74]">
                <span>{active.publishedAt}</span>
                <span>·</span>
                <span>{active.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goto(index - 1) }}
                  className="rounded-full bg-surface-container-lowest p-2 text-[#565e74] shadow-ambient-sm transition hover:-translate-y-0.5"
                  aria-label="Previous blog"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goto(index + 1) }}
                  className="rounded-full bg-surface-container-lowest p-2 text-[#565e74] shadow-ambient-sm transition hover:-translate-y-0.5"
                  aria-label="Next blog"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {featured.map((blog, idx) => (
              <Link
                key={blog.slug}
                to={`/blogs/${blog.slug}`}
                onMouseEnter={() => goto(idx)}
                onFocus={() => goto(idx)}
                className={`block w-full rounded-card px-4 py-4 text-left transition hover:-translate-y-0.5 shadow-ambient-sm focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${
                  idx === index
                    ? 'bg-surface-container-lowest'
                    : 'bg-surface-container-low/80 text-[#565e74]'
                }`}
                aria-current={idx === index}
                aria-label={`Open blog ${blog.title}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#005bc4]">{blog.category}</p>
                    <p className="text-sm font-semibold text-[#2a3439]">{blog.title}</p>
                    <p className="text-xs text-[#565e74]">{blog.readTime} · {blog.publishedAt}</p>
                  </div>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-16 w-20 rounded-2xl object-cover"
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
