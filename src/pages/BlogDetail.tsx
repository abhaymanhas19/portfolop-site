import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Clock3 } from 'lucide-react'
import { useBlogs } from '../hooks/useBlogs'
import Markdown from '../components/Markdown'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { blogs, loading, error } = useBlogs()
  const blog = useMemo(() => blogs.find(b => b.slug === slug), [blogs, slug])
  const [activeImage, setActiveImage] = useState(0)

  // Ensure each blog detail view starts at the top even when navigating from deep scroll positions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  useEffect(() => {
    if (!blog?.images?.length) return
    const timer = setInterval(() => {
      setActiveImage(idx => (idx + 1) % blog.images!.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [blog?.images])

  useEffect(() => {
    setActiveImage(0)
  }, [blog?.slug])

  if (loading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-slate-700">
        <p className="text-lg font-semibold">Loading blog...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-slate-700">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <button onClick={() => navigate('/blogs')} className="btn-primary px-4 py-2 text-sm">Back to blogs</button>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-slate-700">
        <p className="text-lg font-semibold">Blog not found.</p>
        <button onClick={() => navigate('/blogs')} className="btn-primary px-4 py-2 text-sm">Back to blogs</button>
      </div>
    )
  }

  const currentIndex = blogs.findIndex(b => b.slug === blog.slug)
  const prev = blogs[currentIndex - 1]
  const next = blogs[currentIndex + 1]

  return (
    <div className="bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-14 md:px-6 lg:px-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              <BookOpen className="h-4 w-4" /> {blog.category}
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {blog.readTime}</span>
              <span>•</span>
              <span>{blog.publishedAt}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
            {blog.skills.map(skill => (
              <span key={skill} className="rounded-full bg-white px-3 py-1">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 lg:px-8">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="md:float-right md:ml-6 md:mb-4 md:w-[420px] md:max-w-[48%] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,41,67,0.12)]"
          >
            <div className="relative">
              {blog.images && blog.images.length > 0 ? (
                <>
                  <motion.img
                    key={blog.images[activeImage]}
                    src={blog.images[activeImage]}
                    alt={`${blog.title} visual ${activeImage + 1}`}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4 / 3', maxHeight: 460 }}
                    loading="lazy"
                    initial={{ opacity: 0.3, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <button
                      type="button"
                      onClick={() => setActiveImage(i => (i - 1 + blog.images!.length) % blog.images!.length)}
                      className="rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImage(i => (i + 1) % blog.images!.length)}
                      className="rounded-full bg-white/80 p-2 text-slate-700 shadow hover:bg-white"
                      aria-label="Next image"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {blog.images.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveImage(dotIdx)}
                        className={`h-2.5 w-2.5 rounded-full border border-white transition ${dotIdx === activeImage ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to image ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src={blog.image}
                  alt={`${blog.title} visual`}
                  className="w-full object-cover"
                  style={{ aspectRatio: '4 / 3', maxHeight: 460 }}
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Markdown content={blog.body} />
          </motion.div>
          <div className="clear-both" />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
          <button onClick={() => navigate('/blogs')} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <ArrowLeft className="h-4 w-4" /> Back to all blogs
          </button>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            {prev ? (
              <Link to={`/blogs/${prev.slug}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-200">
                <ArrowLeft className="h-4 w-4" /> {prev.title}
              </Link>
            ) : null}
            {next ? (
              <Link to={`/blogs/${next.slug}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-200">
                {next.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
