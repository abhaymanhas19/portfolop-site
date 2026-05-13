import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Clock3 } from 'lucide-react'
import { useBlogs } from '../hooks/useBlogs'
import Markdown from '../components/Markdown'
import Modal from '../components/Modal'

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { blogs, loading, error } = useBlogs()
  const blog = useMemo(() => blogs.find(b => b.slug === slug), [blogs, slug])
  const images = useMemo(
    () => (blog?.images?.length ? blog.images : blog ? [blog.image] : []),
    [blog],
  )
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [isHoverPaused, setIsHoverPaused] = useState(false)
  const autoplayPaused = lightboxOpen || isHoverPaused

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  useEffect(() => {
    if (images.length <= 1) return
    if (autoplayPaused) return
    const timer = setInterval(() => {
      setActiveImage(idx => (idx + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images, autoplayPaused])

  useEffect(() => {
    setActiveImage(0)
  }, [blog?.slug])

  if (loading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-[#565e74]">
        <p className="font-display text-lg font-semibold">Loading blog...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-[#565e74]">
        <p className="font-display text-lg font-semibold text-red-600">{error}</p>
        <button onClick={() => navigate('/blogs')} className="btn-primary px-4 py-2 text-sm">Back to blogs</button>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-[#565e74]">
        <p className="font-display text-lg font-semibold">Blog not found.</p>
        <button onClick={() => navigate('/blogs')} className="btn-primary px-4 py-2 text-sm">Back to blogs</button>
      </div>
    )
  }

  const currentIndex = blogs.findIndex(b => b.slug === blog.slug)
  const prev = blogs[currentIndex - 1]
  const next = blogs[currentIndex + 1]

  return (
    <div className="bg-surface font-body">
      <section className="bg-surface-container-low">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-12 pt-14 md:px-6 lg:px-8">
          <div className="space-y-4">
            <span className="tag-pill">
              <BookOpen className="h-4 w-4" /> {blog.category}
            </span>
            <h1 className="font-display text-display-md font-semibold text-[#2a3439]">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#565e74]/60">
              <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {blog.readTime}</span>
              <span>·</span>
              <span>{blog.publishedAt}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#005bc4]">
            {blog.skills.map(skill => (
              <span key={skill} className="rounded-full bg-surface-container-lowest px-3 py-1">{skill}</span>
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
            className="md:float-right md:ml-6 md:mb-4 md:w-[420px] md:max-w-[48%] overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient"
          >
            <div
              className="relative block cursor-pointer"
              onClick={() => {
                setModalImageIndex(activeImage)
                setLightboxOpen(true)
              }}
              onMouseEnter={() => setIsHoverPaused(true)}
              onMouseLeave={() => setIsHoverPaused(false)}
            >
              {images.length > 0 ? (
                <>
                  <motion.img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={`${blog.title} visual ${activeImage + 1}`}
                    className="w-full bg-surface-container-low object-contain"
                    style={{ aspectRatio: '4 / 3', maxHeight: 460 }}
                    loading="lazy"
                    initial={{ opacity: 0.3, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                  />
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          setActiveImage(i => (i - 1 + images.length) % images.length)
                        }}
                        className="rounded-full bg-surface-container-lowest/85 p-2 text-[#565e74] shadow-ambient-sm hover:bg-surface-container-lowest"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation()
                          setActiveImage(i => (i + 1) % images.length)
                        }}
                        className="rounded-full bg-surface-container-lowest/85 p-2 text-[#565e74] shadow-ambient-sm hover:bg-surface-container-lowest"
                        aria-label="Next image"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <img
                  src={blog.image}
                  alt={`${blog.title} visual`}
                  className="w-full bg-surface-container-low object-contain"
                  style={{ aspectRatio: '4 / 3', maxHeight: 460 }}
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>

          <div>
            {blog.summary && (
              <p className="mb-8 text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-slate-300 pl-4">
                {blog.summary}
              </p>
            )}
            <Markdown content={blog.body} />
          </div>
          <div className="clear-both" />
        </div>

        {images.length > 0 && (
          <Modal
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            title="Image preview"
            subtitle="Full-size view of the selected shot"
          >
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-low">
              <img
                src={images[modalImageIndex] ?? images[0]}
                alt={`${blog.title} visual ${modalImageIndex + 1}`}
                className="mx-auto max-h-[80vh] w-full object-contain"
                loading="lazy"
              />
            </div>
          </Modal>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 pt-6">
          <button onClick={() => navigate('/blogs')} className="inline-flex items-center gap-2 text-sm font-semibold text-[#005bc4]">
            <ArrowLeft className="h-4 w-4" /> Back to all blogs
          </button>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#2a3439]">
            {prev ? (
              <Link to={`/blogs/${prev.slug}`} className="btn-secondary px-3 py-1.5 text-sm">
                <ArrowLeft className="h-4 w-4" /> {prev.title}
              </Link>
            ) : null}
            {next ? (
              <Link to={`/blogs/${next.slug}`} className="btn-secondary px-3 py-1.5 text-sm">
                {next.title} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
