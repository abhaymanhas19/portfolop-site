import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import TiltCard from './TiltCard';
import { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } from 'lucide-react';
const icons = { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical };
export default function Skills() {
    return (_jsxs("section", { id: "skills", className: "mx-auto max-w-6xl px-4 py-16", children: [_jsx(motion.h2, { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .5 }, className: "text-2xl md:text-3xl font-semibold mb-6", children: "Skills by Domain" }), _jsx("div", { className: "grid gap-6 md:grid-cols-2", children: skills.map((group, i) => {
                    const Icon = icons[group.icon] || ServerCog;
                    return (_jsx(motion.div, { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * .05 }, children: _jsxs(TiltCard, { className: "rounded-2xl bg-card border border-border p-6 gradient-border", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-gradient-brand text-[#1A1A1A] grid place-items-center shadow-glow", children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsx("h3", { className: "font-medium text-fg", children: group.domain })] }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: group.skills.map(s => (_jsx("span", { className: "px-3 py-1.5 rounded-full bg-[#222] text-[#FFFFFF] opacity-85 text-sm border border-border hover:shadow-soft transition", children: s }, s))) })] }) }, group.domain));
                }) })] }));
}
