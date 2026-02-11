import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react'
import { blogs } from './blogsData'

export default function Blogs() {
  return (
    <div className="bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-14 pt-16 md:px-6 lg:px-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
              Study Blogs
            </span>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">Learning log & build notes</h1>
            <p className="max-w-3xl text-sm text-slate-600 md:text-base">
              Notes from experiments, guardrails, and engineering decisions. Click any card to read the detail page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            <span className="rounded-full bg-white px-3 py-1">AI/ML</span>
            <span className="rounded-full bg-white px-3 py-1">Backend</span>
            <span className="rounded-full bg-white px-3 py-1">Automation</span>
            <span className="rounded-full bg-white px-3 py-1">DevOps</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_28px_70px_rgba(15,41,67,0.12)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
            >
              <Link to={`/blogs/${blog.slug}`} className="flex h-full flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-5 py-5">
                  <h3 className="text-lg font-semibold text-slate-900">{blog.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">{blog.summary}</p>
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.publishedAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {blog.skills.map(skill => (
                      <span key={skill} className="rounded-full bg-emerald-50 px-3 py-1">{skill}</span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Read blog <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
