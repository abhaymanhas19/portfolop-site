import { FormEvent, useState } from 'react'
import { site } from '../data/site'
import emailjs from '@emailjs/browser'
export default function ContactForm(){
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle'); const [error,setError]=useState<string>('')
  const pk=import.meta.env.VITE_EMAILJS_PUBLIC_KEY, sid=import.meta.env.VITE_EMAILJS_SERVICE_ID, tid=import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const has=Boolean(pk&&sid&&tid)
  function onSubmit(e:FormEvent<HTMLFormElement>){ e.preventDefault(); const f=e.currentTarget; const d=new FormData(f); const name=String(d.get('name')||''); const email=String(d.get('email')||''); const message=String(d.get('message')||'')
    if(!has){ const subject=encodeURIComponent(`Portfolio Contact from ${name}`); const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`); window.location.href=`mailto:${site.CONTACT_EMAIL}?subject=${subject}&body=${body}`; return }
    setStatus('sending'); setError(''); try{ emailjs.init({ publicKey: pk }); emailjs.send(sid, tid, { name,email,message }).then(()=>{ setStatus('success'); f.reset() }).catch(()=>{ setStatus('error'); setError('Failed to send. Please try again or use email link above.') }) } catch{ setStatus('error'); setError('Failed to send. Please try again or use email link above.') }
  }
  return (<section id="contact" className="mx-auto max-w-6xl px-4 py-16">
    <h2 className="text-2xl md:text-3xl font-semibold mb-6">Contact</h2>
    <p className="text-[#FFFFFF] mb-4">Prefer email? <a href={`mailto:${site.CONTACT_EMAIL}`} className="underline">{site.CONTACT_EMAIL}</a></p>
    <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
      <div><label htmlFor="name" className="block text-sm font-medium text-fg">Name</label><input id="name" name="name" required className="mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none"/></div>
      <div><label htmlFor="email" className="block text-sm font-medium text-fg">Email</label><input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none"/></div>
      <div><label htmlFor="message" className="block text-sm font-medium text-fg">Message</label><textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none"/></div>
      <div className="flex items-center gap-3"><button type="submit" className="bg-gradient-brand text-[#1A1A1A] font-medium px-5 py-2.5 rounded-xl shadow-glow hover:translate-y-[-1px] transition focus-ring">{status==='sending'?'Sending…':'Send Message'}</button>{status==='success'&&<span className="text-emerald-400">Message sent ✓</span>}{status==='error'&&<span className="text-red-400">{error}</span>}</div>
    </form>
  </section>)
}
