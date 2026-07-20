import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaGithub, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';
const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Notes', href: '#ai-notes' },
    { label: 'Explore Notes', href: '#explore' },
];
const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
];
const resourceLinks = [
    { label: 'Documentation', href: '#docs' },
    { label: 'Help Center', href: '#help' },
    { label: 'Community', href: '#community' },
    { label: 'Support', href: '#support' },
];
const socialLinks = [
    { icon: FaGithub, label: 'GitHub', href: 'https://github.com/topu9872-cpu' },
    {
        icon: FaFacebook,
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61578488636020',
    },
    {
        icon: FaLinkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mehedi-hasan-topu',
    },
    { icon: FaGlobe, label: 'Portfolio', href: 'https://topudev.vercel.app' },
];
const currentYear = new Date().getFullYear();
const Footer = () => {
    return (_jsx("footer", { className: "border-t border-gray-800 bg-gray-950 px-4 pt-16 pb-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl", children: [_jsxs("div", { className: "grid gap-12 sm:grid-cols-2 lg:grid-cols-5", children: [_jsxs("div", { className: "sm:col-span-2 lg:col-span-2", children: [_jsxs("h3", { className: "text-xl font-bold text-white", children: ["NotePilot", ' ', _jsx("span", { className: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: "AI" })] }), _jsx("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-gray-400", children: "AI-powered note management that helps you organize, summarize, and transform ideas into action." }), _jsxs("a", { href: "https://topudev.vercel.app", target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50 hover:bg-gray-800 hover:text-white", children: [_jsx(FaGlobe, { className: "h-4 w-4 text-indigo-400" }), "topudev.vercel.app"] })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200", children: "Product" }), _jsx("ul", { className: "space-y-3", children: productLinks.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400", children: link.label }) }, link.label))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200", children: "Company" }), _jsx("ul", { className: "space-y-3", children: companyLinks.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400", children: link.label }) }, link.label))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200", children: "Resources" }), _jsx("ul", { className: "space-y-3", children: resourceLinks.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-sm text-gray-400 transition-all duration-300 hover:translate-x-0.5 hover:text-indigo-400", children: link.label }) }, link.label))) })] })] }), _jsxs("div", { className: "mt-12 border-t border-gray-800 pt-8", children: [_jsxs("div", { className: "flex flex-col items-center gap-6 sm:flex-row sm:justify-between", children: [_jsx("div", { className: "flex items-center gap-3", children: socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (_jsx("a", { href: social.href, target: "_blank", rel: "noopener noreferrer", "aria-label": social.label, className: "flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-400 transition-all duration-300 hover:scale-110 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400", children: _jsx(Icon, { className: "h-4 w-4" }) }, social.label));
                                    }) }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("a", { href: "#privacy", className: "text-sm text-gray-500 transition-all duration-300 hover:text-indigo-400", children: "Privacy Policy" }), _jsx("a", { href: "#terms", className: "text-sm text-gray-500 transition-all duration-300 hover:text-indigo-400", children: "Terms of Service" })] })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-500 sm:text-left", children: ["\u00A9 ", currentYear, " NotePilot AI. All rights reserved."] })] })] }) }));
};
export default Footer;
