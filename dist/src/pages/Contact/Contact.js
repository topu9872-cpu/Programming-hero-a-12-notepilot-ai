import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Globe, ChevronDown, Send, Sparkles, ArrowRight, MessageSquare, HelpCircle } from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
const Contact = () => {
    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // FAQ Accordion State
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    // Mock Contact Info Data
    const contactInfoData = [
        {
            icon: _jsx(Mail, { className: "w-5 h-5 text-indigo-500 dark:text-indigo-400" }),
            title: 'Email Us',
            value: 'topu9872@notepilot.ai',
            details: 'Online support team response within 24 hours',
        },
        {
            icon: _jsx(Phone, { className: "w-5 h-5 text-violet-500 dark:text-violet-400" }),
            title: 'Call Us',
            value: '+880 1770977764',
            details: 'Available for instant high-tier enterprise assistance',
        },
        {
            icon: _jsx(MapPin, { className: "w-5 h-5 text-purple-500 dark:text-purple-400" }),
            title: 'Location',
            value: 'Dhaka, Bangladesh',
            details: 'HQ operations and global engineering hub',
        },
        {
            icon: _jsx(Clock, { className: "w-5 h-5 text-fuchsia-500 dark:text-fuchsia-400" }),
            title: 'Working Hours',
            value: 'Sunday–Thursday',
            details: '9:00 AM – 6:00 PM (GMT+6)',
        },
    ];
    // Mock Social Links Data
    const socialLinksData = [
        {
            icon: _jsx(FaGithub, { className: "w-5 h-5" }),
            name: 'GitHub',
            url: 'https://github.com/topu9872-cpu',
            username: '@topu9872-cpu',
        },
        {
            icon: _jsx(FaLinkedin, { className: "w-5 h-5" }),
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/mehedi-hasan-topu',
            username: 'mehedi-hasan-topu',
        },
        {
            icon: _jsx(FaFacebook, { className: "w-5 h-5" }),
            name: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61578488636020',
            username: 'NotePilot AI Official',
        },
        {
            icon: _jsx(Globe, { className: "w-5 h-5" }),
            name: 'Portfolio',
            url: 'https://topudev.vercel.app',
            username: 'topudev.vercel.app',
        },
    ];
    // Mock FAQ Data
    const faqData = [
        {
            question: 'Is NotePilot AI free?',
            answer: 'Yes! NotePilot AI offers a robust Free Tier that includes essential AI note generation, core structuring options, and daily credits. Premium tiers are available for heavy workloads and unlimited AI integration.',
        },
        {
            question: 'How secure are my notes?',
            answer: 'Security is our baseline. All data handled by NotePilot AI is encrypted both in transit using TLS 1.3 and at rest with AES-256 standard encryption. Your notes are fully isolated and secure.',
        },
        {
            question: 'Can I use Google Login?',
            answer: 'Absolutely. NotePilot AI supports seamless standard single sign-on (SSO) authentication flows including Google Login to ensure fast and secure access to your personal digital dashboard.',
        },
        {
            question: 'Do you support AI note summarization?',
            answer: 'Yes, our custom language models specialize in instant multi-format summarization. You can condense dense documentation, meetings, or lecture notes into clean bulleted action steps in seconds.',
        },
    ];
    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields before sending.');
            return;
        }
        setIsSubmitting(true);
        // Mock response delay
        setTimeout(() => {
            toast.success('Message sent successfully! Our AI coordination team will be in touch soon.');
            setFormData({ fullName: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };
    // Toggle FAQ Accordion
    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300", children: [_jsx("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" }), _jsx("div", { className: "absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" }), _jsxs("section", { className: "relative pt-24 pb-16 px-4 max-w-7xl mx-auto text-center z-10", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wide rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 backdrop-blur-sm", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Connect Instantly" })] }), _jsx("h1", { className: "text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400", children: "Contact Us" }), _jsx("p", { className: "mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed", children: "Have structural questions about NotePilot AI, feature requests, or enterprise scaling goals? Get in touch with our engineering team today." })] }), _jsx("section", { className: "max-w-7xl mx-auto px-4 pb-20 relative z-10", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-7 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400", children: _jsx(MessageSquare, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl md:text-2xl font-bold tracking-tight", children: "Drop us a Line" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Fill out our encrypted communication channel input matrix." })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "fullName", className: "text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300", children: "Full Name" }), _jsx("input", { type: "text", id: "fullName", name: "fullName", value: formData.fullName, onChange: handleInputChange, placeholder: "Mehedi Hasan", className: "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300", children: "Email Address" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "you@domain.com", className: "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "subject", className: "text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300", children: "Subject" }), _jsx("input", { type: "text", id: "subject", name: "subject", value: formData.subject, onChange: handleInputChange, placeholder: "How can we assist you?", className: "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "message", className: "text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300", children: "Message" }), _jsx("textarea", { id: "message", name: "message", rows: 5, value: formData.message, onChange: handleInputChange, placeholder: "Tell us about your project requirements...", className: "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 resize-none animate-none", required: true })] }), _jsxs("button", { type: "submit", disabled: isSubmitting, className: "w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group", children: [_jsx("span", { children: isSubmitting ? 'Processing Network Transmission...' : 'Send Message' }), _jsx(Send, { className: "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" })] })] })] }), _jsxs("div", { className: "lg:col-span-5 space-y-4", children: [_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4", children: contactInfoData.map((info, idx) => (_jsx("div", { className: "group bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300", children: info.icon }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500", children: info.title }), _jsx("p", { className: "text-base font-semibold text-slate-900 dark:text-slate-100", children: info.value }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-normal", children: info.details })] })] }) }, idx))) }), _jsxs("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm", children: [_jsx("h3", { className: "text-base font-bold mb-4 tracking-wide text-slate-900 dark:text-slate-100", children: "Global Synchronizations" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: socialLinksData.map((social, idx) => (_jsxs("a", { href: social.url, target: "_blank", rel: "noopener noreferrer", className: "flex flex-col p-3 rounded-xl bg-slate-100/50 hover:bg-indigo-500/5 dark:bg-slate-800/40 dark:hover:bg-indigo-500/10 border border-slate-200/50 dark:border-slate-800/50 group transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/30", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200", children: [_jsx("div", { className: "group-hover:rotate-12 transition-transform duration-300", children: social.icon }), _jsx("span", { className: "text-sm font-semibold", children: social.name })] }), _jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1 truncate", children: social.username })] }, idx))) })] })] })] }) }), _jsxs("section", { className: "max-w-4xl mx-auto px-4 pb-24 relative z-10", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20", children: [_jsx(HelpCircle, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Knowledge Base" })] }), _jsx("h2", { className: "text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white", children: "Frequently Asked Questions" }), _jsx("p", { className: "text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2", children: "Get quick answers to common structural paradigms." })] }), _jsx("div", { className: "space-y-4", children: faqData.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (_jsxs("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300", children: [_jsxs("button", { onClick: () => toggleFaq(idx), className: "w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-200 focus:outline-none", children: [_jsx("span", { className: "text-base md:text-lg font-semibold pr-4", children: faq.question }), _jsx(ChevronDown, { className: `w-5 h-5 text-slate-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-500' : ''}` })] }), _jsx("div", { className: `transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-slate-100 dark:border-slate-800/50' : 'max-h-0'}`, children: _jsx("p", { className: "p-5 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20", children: faq.answer }) })] }, idx));
                        }) })] }), _jsx("section", { className: "max-w-6xl mx-auto px-4 pb-24 relative z-10", children: _jsxs("div", { className: "relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white p-8 md:p-14 text-center border border-indigo-500/20 shadow-2xl shadow-indigo-950/20", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" }), _jsxs("div", { className: "relative z-10 max-w-2xl mx-auto space-y-6", children: [_jsx("h2", { className: "text-3xl md:text-5xl font-extrabold tracking-tight leading-tight", children: "Let's Build Smarter Notes Together" }), _jsx("p", { className: "text-slate-300 text-base md:text-lg font-normal leading-relaxed opacity-90", children: "Empower your knowledge mapping lifecycle. Tap into structural AI parsing matrix frameworks with customized workspace synchronization models." }), _jsxs("div", { className: "pt-4 flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsxs("button", { className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-bold px-6 py-3.5 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-md", children: [_jsx("span", { children: "Get Started" }), _jsx(ArrowRight, { className: "w-4 h-4 text-slate-950" })] }), _jsx("button", { className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl backdrop-blur-sm active:scale-[0.98] transition-all duration-200", children: _jsx("span", { children: "Explore Notes" }) })] })] })] }) })] }));
};
export default Contact;
