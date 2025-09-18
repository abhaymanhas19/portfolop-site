import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CalendarCheck, Clock, MessageCircle } from 'lucide-react'
import { site } from '../data/site'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const sid = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const hasEmailJs = Boolean(pk && sid && tid)

  const detailCards = [
    {
      icon: Mail,
      title: 'Primary inbox',
      value: site.CONTACT_EMAIL,
      description: 'Drop a line with project goals, timelines, or AI product ideas.',
      href: `mailto:${site.CONTACT_EMAIL}`
    },
    {
      icon: CalendarCheck,
      title: 'Availability',
      value: 'Open for AI & backend collaborations',
      description: 'Now booking consults and build partnerships for the next quarter.'
    },
    {
      icon: Clock,
      title: 'Response time',
      value: 'Replies within 24 hours',
      description: `${site.LOCATION} · IST (UTC+5:30)`
    }
  ]

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
          setError('Failed to send. Please try again or use the email link above.')
        })
    } catch {
      setStatus('error')
      setError('Failed to send. Please try again or use the email link above.')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-[#151516] to-black/90 px-6 py-12 md:px-10 lg:px-14">
        <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full bg-[#ff5a1c2f] blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-[-80px] left-[-40px] h-72 w-72 rounded-full bg-[#ff5a1c1f] blur-[140px]" aria-hidden />

        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                <MessageCircle className="h-3.5 w-3.5 text-[#ff5a1c]" /> Let's talk
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Share the challenge you're solving.
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Whether you need an applied AI partner, production-ready backend, or guidance on scaling infrastructure, I’d love to help map the next steps.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {detailCards.map(card => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <card.icon className="h-5 w-5 text-[#ff5a1c]" />
                  <div className="mt-3 space-y-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">{card.title}</p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="text-sm font-semibold text-white hover:text-[#ff5a1c] transition break-all"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-white">{card.value}</p>
                    )}
                    <p className="text-xs text-white/60 leading-relaxed">{card.description}</p>
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 grid gap-5 rounded-2xl border border-white/10 bg-black/70 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium text-white/80" htmlFor="name">
                Name
                <input
                  id="name"
                  name="name"
                  required
                  className="rounded-xl border border-white/10 bg-[#1c1c1f] px-3 py-2 text-sm text-white focus:border-[#ff5a1c]/50 focus:outline-none focus:ring-2 focus:ring-[#ff5a1c]/40"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-white/80" htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-white/10 bg-[#1c1c1f] px-3 py-2 text-sm text-white focus:border-[#ff5a1c]/50 focus:outline-none focus:ring-2 focus:ring-[#ff5a1c]/40"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm font-medium text-white/80" htmlFor="message">
              Project details
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="rounded-xl border border-white/10 bg-[#1c1c1f] px-3 py-3 text-sm text-white focus:border-[#ff5a1c]/50 focus:outline-none focus:ring-2 focus:ring-[#ff5a1c]/40"
                placeholder="Share the problem, desired outcomes, and timeline—I'll follow up quickly."
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_32px_rgba(255,90,28,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,90,28,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <span className="text-xs text-white/60" aria-live="polite">
                {status === 'success' && 'Thanks! Message delivered successfully.'}
                {status === 'error' && error}
              </span>
              {!hasEmailJs && (
                <span className="text-xs text-white/50">
                  Email sending uses your mail client when the service isn’t configured.
                </span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
