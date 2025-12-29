import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CalendarCheck, Clock, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { site } from '../data/site'
import { contactContent } from '../data/content'

const detailCards = [
  {
    icon: Mail,
    title: 'Primary inbox',
    value: site.CONTACT_EMAIL,
    description: 'Drop a line with project goals, timelines, or AI product ideas.',
    href: `mailto:${site.CONTACT_EMAIL}`,
  },
  {
    icon: CalendarCheck,
    title: 'Availability',
    value: 'Open for AI & backend collaborations',
    description: 'Booking strategy calls and build partnerships for the next quarter.',
  },
  {
    icon: Clock,
    title: 'Response time',
    value: 'Replies within 24 hours',
    description: `${site.LOCATION} · IST (UTC+5:30)`,
  },
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const hasEmailJs = Boolean(pk && sid && tid)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    if (!hasEmailJs) {
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${site.CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    setError('')

    try {
      emailjs.init({ publicKey: pk! })
      emailjs
        .send(sid!, tid!, { name, email, message })
        .then(() => {
          setStatus('success')
          form.reset()
        })
        .catch(() => {
          setStatus('error')
          setError('Something went wrong. Please try again or use the email link above.')
        })
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again or use the email link above.')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20">

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-slate-900">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.12)]">
          <div className="relative grid gap-12 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
            <div className="pointer-events-none absolute -top-24 right-0 h-40 w-40 rounded-full bg-soft-accent/70 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-48 w-48 rounded-full bg-emerald-100/70 blur-[120px]" aria-hidden />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative space-y-8"
            >
              <div className="space-y-4">
                <span className="tag-pill px-3">
                  <MessageCircle className="h-3.5 w-3.5" /> Let’s talk
                </span>
                <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                  {contactContent.title}
                </h2>
                <p className="max-w-2xl text-base text-slate-600 md:text-lg">
                  {contactContent.subtitle}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {detailCards.map(card => (
                  <div
                    key={card.title}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(15,23,42,0.16)]"
                  >
                    <card.icon className="h-5 w-5 text-slate-600" />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.title}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="break-all text-sm font-semibold text-slate-700 transition hover:text-slate-900"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-700">{card.value}</p>
                      )}
                      <p className="text-xs leading-relaxed text-slate-500">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
              className="relative z-10 grid gap-5 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700" htmlFor="name">
                  Name
                  <input
                    id="name"
                    name="name"
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder={contactContent.form.namePlaceholder}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder={contactContent.form.emailPlaceholder}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700" htmlFor="message">
                Project details
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder={contactContent.form.messagePlaceholder}
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn-primary">
                  {status === 'sending' ? 'Sending…' : contactContent.form.submitText}
                </button>
                <span className="text-xs text-slate-500" aria-live="polite">
                  {status === 'success' && 'Thanks! Message delivered successfully.'}
                  {status === 'error' && error}
                </span>
                {!hasEmailJs && (
                  <span className="text-xs text-slate-400">
                    No email service configured—your mail client will open on submit.
                  </span>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
