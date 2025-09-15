import { jsx as _jsx } from "react/jsx-runtime";
export default function FlowTextRing({ text, radius = 280, size = 48, speedSec = 28, tiltDeg = 36, yPercent = 40 }) {
    const chars = Array.from(text.toUpperCase()).filter(Boolean);
    const sequence = Array.from({ length: size }, (_, i) => chars[i % chars.length]);
    const step = 360 / size;
    return (_jsx("div", { className: "ring3d", style: { pointerEvents: 'none' }, "aria-hidden": true, children: _jsx("div", { className: "ring3d__belt", style: { ['--rx']: `${tiltDeg}deg`, top: `${yPercent}%` }, children: _jsx("div", { className: "ring3d__spin", style: { ['--speed']: `${speedSec}s` }, children: sequence.map((ch, i) => (_jsx("span", { className: "ring3d__char", style: { ['--angle']: `${i * step}deg`, ['--radius']: `${radius}px` }, children: ch }, i))) }) }) }));
}
