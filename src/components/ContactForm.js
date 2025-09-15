import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { site } from '../data/site';
import emailjs from '@emailjs/browser';
export default function ContactForm() {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY, sid = import.meta.env.VITE_EMAILJS_SERVICE_ID, tid = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const has = Boolean(pk && sid && tid);
    function onSubmit(e) {
        e.preventDefault();
        const f = e.currentTarget;
        const d = new FormData(f);
        const name = String(d.get('name') || '');
        const email = String(d.get('email') || '');
        const message = String(d.get('message') || '');
        if (!has) {
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:${site.CONTACT_EMAIL}?subject=${subject}&body=${body}`;
            return;
        }
        setStatus('sending');
        setError('');
        try {
            emailjs.init({ publicKey: pk });
            emailjs.send(sid, tid, { name, email, message }).then(() => { setStatus('success'); f.reset(); }).catch(() => { setStatus('error'); setError('Failed to send. Please try again or use email link above.'); });
        }
        catch {
            setStatus('error');
            setError('Failed to send. Please try again or use email link above.');
        }
    }
    return (_jsxs("section", { id: "contact", className: "mx-auto max-w-6xl px-4 py-16", children: [_jsx("h2", { className: "text-2xl md:text-3xl font-semibold mb-6", children: "Contact" }), _jsxs("p", { className: "text-[#FFFFFF] mb-4", children: ["Prefer email? ", _jsx("a", { href: `mailto:${site.CONTACT_EMAIL}`, className: "underline", children: site.CONTACT_EMAIL })] }), _jsxs("form", { onSubmit: onSubmit, className: "grid gap-4 max-w-2xl", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-fg", children: "Name" }), _jsx("input", { id: "name", name: "name", required: true, className: "mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-fg", children: "Email" }), _jsx("input", { id: "email", name: "email", type: "email", required: true, className: "mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-fg", children: "Message" }), _jsx("textarea", { id: "message", name: "message", rows: 5, required: true, className: "mt-1 w-full rounded-xl border border-border bg-[#222] text-fg px-3 py-2 focus:ring-2 focus:ring-[var(--accent)] outline-none" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "submit", className: "bg-gradient-brand text-[#1A1A1A] font-medium px-5 py-2.5 rounded-xl shadow-glow hover:translate-y-[-1px] transition focus-ring", children: status === 'sending' ? 'Sending…' : 'Send Message' }), status === 'success' && _jsx("span", { className: "text-emerald-400", children: "Message sent \u2713" }), status === 'error' && _jsx("span", { className: "text-red-400", children: error })] })] })] }));
}
