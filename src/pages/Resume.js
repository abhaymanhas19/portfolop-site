import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { site } from '../data/site';
function usePdfWorker() { const [ready, setReady] = useState(false); useEffect(() => { let a = true; import('pdfjs-dist/build/pdf.worker.min.js?url').then(w => { if (a) {
    pdfjs.GlobalWorkerOptions.workerSrc = w.default;
    setReady(true);
} }); return () => { a = false; }; }, []); return ready; }
export default function Resume() { const ready = usePdfWorker(); const [numPages, setNumPages] = useState(0); return (_jsxs("section", { className: 'mx-auto max-w-5xl px-4 py-16', children: [_jsxs("div", { className: 'flex items-center justify-between gap-4', children: [_jsx("h1", { className: 'text-3xl font-semibold', children: "Resume" }), _jsx("a", { href: site.RESUME_PDF_PATH, download: true, className: 'bg-gradient-brand text-[#1A1A1A] font-medium px-4 py-2 rounded-lg', children: "Download" })] }), _jsx("div", { className: 'mt-6 rounded-xl overflow-hidden bg-card border border-border', children: ready ? (_jsx(Document, { file: site.RESUME_PDF_PATH, onLoadSuccess: (p) => setNumPages(p.numPages), children: Array.from({ length: numPages }, (_, i) => (_jsx(Page, { pageNumber: i + 1, renderTextLayer: false, renderAnnotationLayer: false, className: 'mx-auto' }, i))) })) : (_jsx("div", { className: 'p-10 text-center text-[#030753]', children: "Loading PDF\u2026" })) })] })); }
