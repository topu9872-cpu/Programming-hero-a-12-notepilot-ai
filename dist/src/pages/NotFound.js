import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, Home, Feather, Sparkles, HelpCircle, Search, AlertCircle } from 'lucide-react';
export default function NotFound() {
    const navigate = useNavigate();
    // Dynamic document title update
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    // Mouse parallax motion coordinates for premium background interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };
    // Parallax transform coefficients for multi-layered background depth
    const bgX1 = useTransform(mouseX, (value) => value * -0.04);
    const bgY1 = useTransform(mouseY, (value) => value * -0.04);
    const bgX2 = useTransform(mouseX, (value) => value * 0.03);
    const bgY2 = useTransform(mouseY, (value) => value * 0.03);
    // Keyboard shortcut fallback map (Backspace -> Back, Escape -> Home)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                navigate(-1);
            }
            else if (e.key === 'Escape') {
                e.preventDefault();
                navigate('/');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);
    return (_jsxs("div", { className: "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-500 selection:bg-indigo-500/30 select-none font-sans", onMouseMove: handleMouseMove, children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Page Not Found | NotePilot AI" }), _jsx("meta", { name: "description", content: "The page you are looking for does not exist or has been relocated within NotePilot AI workspace." }), _jsx("meta", { name: "robots", content: "noindex, follow" })] }), _jsxs("div", { className: "absolute inset-0 pointer-events-none z-0", children: [_jsx(motion.div, { style: { x: bgX1, y: bgY1 }, className: "absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 dark:from-indigo-900/30 dark:to-purple-900/20 blur-[120px]" }), _jsx(motion.div, { style: { x: bgX2, y: bgY2 }, className: "absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-cyan-400/15 to-emerald-400/15 dark:from-cyan-900/20 dark:to-emerald-900/15 blur-[140px]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-70" })] }), _jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden z-0", children: [...Array(6)].map((_, i) => (_jsx(motion.div, { className: "absolute rounded-full bg-indigo-500/30 dark:bg-indigo-400/20 blur-sm", style: {
                        width: Math.random() * 16 + 8,
                        height: Math.random() * 16 + 8,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }, animate: {
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.7, 0.2],
                        scale: [1, 1.2, 1]
                    }, transition: {
                        duration: 6 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    } }, i))) }), _jsxs(motion.main, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, className: "relative w-full max-w-2xl text-center z-10", children: [_jsxs("div", { className: "relative w-full flex justify-center mb-8 h-64 items-center", children: [_jsx("div", { className: "absolute w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 blur-3xl animate-pulse" }), _jsx(motion.div, { initial: { scale: 0.85 }, animate: { scale: 1 }, transition: { duration: 0.8, type: "spring" }, className: "absolute tracking-tighter font-black text-[11rem] md:text-[13rem] bg-clip-text text-transparent bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 opacity-40 dark:opacity-60 select-none font-sans", children: "404" }), _jsxs(motion.div, { animate: { y: [0, -12, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }, className: "relative flex items-center justify-center w-48 h-48 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6", children: [_jsx("div", { className: "absolute top-4 left-4 w-2 h-2 rounded-full bg-indigo-500 animate-ping" }), _jsx("div", { className: "absolute bottom-4 right-4 text-slate-400 dark:text-slate-600", children: _jsx(Sparkles, { className: "w-4 h-4 text-indigo-400 dark:text-indigo-500" }) }), _jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 25, repeat: Infinity, ease: "linear" }, className: "absolute -top-3 -right-3 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md text-purple-500", children: _jsx(Search, { className: "w-4 h-4" }) }), _jsx(motion.div, { animate: { y: [0, 8, 0] }, transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, className: "absolute -bottom-2 -left-4 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md text-amber-500", children: _jsx(AlertCircle, { className: "w-4 h-4" }) }), _jsxs("div", { className: "relative p-5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20", children: [_jsx(motion.div, { animate: { rotate: [0, -8, 8, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }, children: _jsx(Feather, { className: "w-12 h-12 stroke-[1.5]" }) }), _jsx("div", { className: "absolute -bottom-1 -right-1 bg-white dark:bg-slate-950 p-1 rounded-full border border-slate-100 dark:border-slate-800", children: _jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500" }) })] })] }), _jsxs(motion.div, { animate: { x: [0, 10, 0], y: [0, -5, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }, className: "absolute top-12 left-16 md:left-24 p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400", children: [_jsx(HelpCircle, { className: "w-3.5 h-3.5 text-indigo-500" }), _jsx("span", { children: "Index Missing" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Page Not Found" }), _jsx("p", { className: "text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed", children: "The page you're looking for doesn't exist, may have been moved, or the link is incorrect." }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.15, duration: 0.5 }, className: "inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/50 dark:bg-indigo-950/20 text-sm font-medium text-indigo-600 dark:text-indigo-400 max-w-sm mx-auto", children: [_jsx(Sparkles, { className: "w-4 h-4 flex-shrink-0 animate-pulse" }), _jsx("span", { className: "italic", children: "\"It looks like this page wandered off while organizing your notes.\"" })] })] }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3, duration: 0.5 }, className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto", children: [_jsxs("button", { onClick: () => navigate('/'), "aria-label": "Navigate to home panel", className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 shadow-sm shadow-indigo-500/10 hover:shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 cursor-pointer", children: [_jsx(Home, { className: "w-4 h-4" }), _jsx("span", { children: "Go Home" })] }), _jsxs("button", { onClick: () => navigate(-1), "aria-label": "Return to your prior page", className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all duration-200 shadow-sm active:scale-[0.98] outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700 focus:ring-offset-2 dark:focus:ring-offset-slate-950 cursor-pointer", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Go Back" })] })] })] }), _jsxs(motion.footer, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 0.5 }, className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-slate-400 dark:text-slate-600 pointer-events-none tracking-wide", children: [_jsx("span", { children: "NotePilot AI Engine \u2022 Press " }), _jsx("kbd", { className: "px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[10px] font-mono shadow-sm", children: "Backspace" }), _jsx("span", { children: " to revert" })] })] }));
}
