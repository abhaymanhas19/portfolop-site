import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Certifications from './pages/Certifications';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
function ScrollToHash() {
    const { hash, pathname } = useLocation();
    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el)
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash, pathname]);
    return null;
}
export default function App() {
    const [loading, setLoading] = useState(true);
    useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);
    return (_jsxs("div", { className: "min-h-screen flex flex-col relative bg-bg text-fg", children: [_jsx(Navbar, {}), _jsx(ScrollToHash, {}), _jsx(AnimatePresence, { children: loading && (_jsx(motion.div, { className: "fixed inset-0 z-[60] grid place-items-center bg-bg", initial: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: .35 }, children: _jsx(motion.div, { initial: { scale: .9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "text-2xl font-bold text-gradient", children: "Loading\u2026" }) })) }), _jsx("main", { className: "flex-1", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/resume", element: _jsx(Resume, {}) }), _jsx(Route, { path: "/certifications", element: _jsx(Certifications, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }), _jsx(Footer, {})] }));
}
