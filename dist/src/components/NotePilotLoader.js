import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
const LOADING_MESSAGES = [
    "Initializing neural network",
    "Optimizing model weights",
    "Syncing vector embeddings",
    "Structuring your workspace",
    "Ready to launch",
];
export const NotePilotLoader = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    // Cycle through more technical, AI-focused messages
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden", role: "dialog", "aria-modal": "true", "aria-busy": "true", "aria-label": "NotePilot AI is thinking", children: [_jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" }), _jsxs("div", { className: "relative flex flex-col items-center max-w-md w-full px-6", children: [_jsxs("div", { className: "relative w-64 h-64 flex items-center justify-center mb-12", children: [_jsx(motion.div, { animate: {
                                    scale: [1, 1.3, 0.9, 1.1, 1],
                                    rotate: [0, 120, 240, 360],
                                }, transition: { duration: 10, repeat: Infinity, ease: "linear" }, className: "absolute w-40 h-40 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 rounded-full blur-[50px] opacity-40 dark:opacity-50 mix-blend-screen" }), _jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 8, repeat: Infinity, ease: "linear" }, className: "absolute w-52 h-52 rounded-full border border-dashed border-indigo-400/30 dark:border-indigo-500/20" }), _jsx(motion.div, { animate: { rotate: -360 }, transition: { duration: 12, repeat: Infinity, ease: "linear" }, className: "absolute w-44 h-44 rounded-full border border-indigo-500/40 dark:border-purple-400/30 border-t-transparent border-b-transparent" }), _jsx(motion.div, { animate: {
                                    borderRadius: [
                                        "42% 58% 70% 30% / 45% 45% 55% 55%",
                                        "70% 30% 52% 48% / 60% 40% 60% 40%",
                                        "50% 50% 34% 66% / 56% 68% 32% 44%",
                                        "42% 58% 70% 30% / 45% 45% 55% 55%"
                                    ],
                                    rotate: [0, 90, 180, 360]
                                }, transition: {
                                    duration: 7,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }, className: "absolute w-32 h-32 bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_40px_rgba(99,102,241,0.5)] dark:shadow-[0_0_50px_rgba(99,102,241,0.3)] opacity-90" }), _jsx(motion.div, { animate: { y: [-4, 4, -4] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }, className: "absolute z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-white shadow-xl", children: _jsx(Sparkles, { className: "w-6 h-6 text-cyan-200 animate-pulse" }) })] }), _jsx("div", { className: "flex items-center justify-center gap-1 mb-4 h-4", children: [...Array(4)].map((_, i) => (_jsx(motion.span, { className: "w-1 bg-gradient-to-t from-cyan-500 to-indigo-500 rounded-full", animate: { height: ["4px", "16px", "4px"] }, transition: {
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                            } }, i))) }), _jsx("div", { className: "h-8 relative flex items-center justify-center overflow-hidden w-full text-center", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 12, filter: "blur(4px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -12, filter: "blur(4px)" }, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }, className: "absolute text-xs sm:text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase flex items-center gap-2", children: [_jsx("span", { className: "text-cyan-500 dark:text-cyan-400 font-bold font-sans", children: "\u26A1" }), LOADING_MESSAGES[messageIndex]] }, messageIndex) }) }), _jsx("span", { className: "mt-8 text-[10px] font-sans tracking-[0.2em] font-medium uppercase text-slate-400/60 dark:text-slate-600", children: "NotePilot Core v2.0" })] })] }));
};
