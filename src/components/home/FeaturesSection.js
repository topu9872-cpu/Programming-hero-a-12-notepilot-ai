import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Sparkles, Brain, Tag, FileText, Zap, Shield } from 'lucide-react';
const features = [
    {
        icon: Brain,
        title: 'AI Note Summary',
        description: 'Automatically generate concise summaries of your notes using advanced AI, saving you hours of re-reading and review time.',
        color: 'text-indigo-600 dark:text-indigo-400',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
    },
    {
        icon: Tag,
        title: 'Smart Auto Tagging',
        description: 'Let AI analyze your content and apply relevant tags automatically, keeping your notes organized without manual effort.',
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/40',
    },
    {
        icon: Sparkles,
        title: 'Context Assistant',
        description: 'Get intelligent suggestions and contextual insights as you write, helping you develop ideas with AI-powered assistance.',
        color: 'text-pink-600 dark:text-pink-400',
        bgColor: 'bg-pink-100 dark:bg-pink-900/40',
    },
    {
        icon: FileText,
        title: 'Rich Note Editor',
        description: 'Write and format notes with a powerful editor that supports markdown, code blocks, images, and more out of the box.',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    },
    {
        icon: Zap,
        title: 'Instant Search',
        description: 'Find any note in milliseconds with AI-powered semantic search that understands what you mean, not just keywords.',
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    },
    {
        icon: Shield,
        title: 'End-to-End Security',
        description: 'Your notes are encrypted and protected with enterprise-grade security, ensuring your ideas remain private and safe.',
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-100 dark:bg-cyan-900/40',
    },
];
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};
const FeaturesSection = () => {
    return (_jsxs("section", { className: "relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 dark:bg-gray-950", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 -z-10", "aria-hidden": "true", children: _jsx("div", { className: "absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-800" }) }), _jsxs(motion.div, { className: "mx-auto max-w-7xl", initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-100px' }, variants: {
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: 'easeOut' },
                    },
                }, children: [_jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [_jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-300", children: [_jsx(Sparkles, { className: "h-4 w-4" }), _jsx("span", { children: "Powerful Features" })] }), _jsxs("h2", { className: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white", children: ["Everything You Need to", ' ', _jsx("span", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Think Better" })] }), _jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400", children: "Powerful tools designed to transform the way you capture, organize, and enhance your ideas with artificial intelligence." })] }), _jsx(motion.div, { className: "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-50px' }, children: features.map((feature) => {
                            const Icon = feature.icon;
                            return (_jsxs(motion.div, { variants: itemVariants, className: "group relative cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:shadow-indigo-900/20", children: [_jsx("div", { className: `mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${feature.bgColor}`, children: _jsx(Icon, { className: `h-6 w-6 ${feature.color}` }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: feature.title }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400", children: feature.description }), _jsx("div", { className: "absolute bottom-0 left-6 right-6 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" })] }, feature.title));
                        }) })] })] }));
};
export default FeaturesSection;
