import { FormEvent, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mail, CalendarCheck, Clock, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { usePortfolio } from '../hooks/usePortfolio'

export default function ContactForm() {
  const { branding } = usePortfolio()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string>('')

  const detailCards = useMemo(() => [
    {
      icon: Mail,
      title: 'Primary inbox',
      value: branding.email,
      description: 'Drop a line with project goals, timelines, or AI product ideas.',
      href: `mailto:${branding.email}`,
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
      description: `${branding.location} · IST (UTC+5:30)`,
    },
  ], [branding])

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
      window.location.href = `mailto:${branding.email}?subject=${subject}&body=${body}`
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
    <section id="contact" className="relative overflow-hidden bg-surface py-ds-16">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="overflow-hidden rounded-card bg-surface-container-lowest shadow-ambient-lg">
          <div className="relative grid gap-12 px-6 py-12 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative space-y-8"
            >
              <div className="space-y-4">
                <span className="tag-pill px-3">
                  <MessageCircle className="h-3.5 w-3.5" /> Let's talk
                </span>
                <h2 className="font-display text-display-md font-semibold text-[#2a3439]">
                  Reach out to build something senior
                </h2>
                <p className="max-w-2xl text-body-lg text-[#565e74]">
                  Whether you need a full-stack platform, an intelligent automation system, or just a technical second opinion, I'm here to help.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {detailCards.map(card => (
                  <div
                    key={card.title}
                    className="rounded-card bg-surface-container-low p-5 shadow-ambient-sm transition hover:-translate-y-1 hover:shadow-ambient"
                  >
                    <card.icon className="h-5 w-5 text-[#005bc4]" />
                    <div className="mt-3 space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#565e74]/60">{card.title}</p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="break-all text-sm font-semibold text-[#2a3439] transition hover:text-[#005bc4]"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#2a3439]">{card.value}</p>
                      )}
                      <p className="text-xs leading-relaxed text-[#565e74]">{card.description}</p>
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
              className="relative z-10 grid gap-5 rounded-card bg-surface-container-low p-6 shadow-ambient"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-[#2a3439]" htmlFor="name">
                  Name
                  <input
                    id="name"
                    name="name"
                    required
                    className="rounded-2xl bg-surface-container-low px-4 py-3 text-sm text-[#2a3439] transition focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-[#005bc4]/20"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-[#2a3439]" htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-2xl bg-surface-container-low px-4 py-3 text-sm text-[#2a3439] transition focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-[#005bc4]/20"
                    placeholder="Your email address"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-1 text-sm font-medium text-[#2a3439]" htmlFor="message">
                Project details
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="rounded-2xl bg-surface-container-low px-4 py-3 text-sm text-[#2a3439] transition focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-[#005bc4]/20"
                  placeholder="Tell me about your project, goals, and any specific challenges you're facing."
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn-primary">
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                <span className="text-xs text-[#565e74]" aria-live="polite">
                  {status === 'success' && 'Thanks! Message delivered successfully.'}
                  {status === 'error' && error}
                </span>
                {!hasEmailJs && (
                  <span className="text-xs text-[#565e74]/60">
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
