import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogIn, LogOut, Sparkles } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Explore", href: "/explore" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        ...(user
            ? [{ label: "Dashboard", href: "/dashboard" }]
            : []),
    ];
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark');
    const toggleTheme = () => {
        const isNowDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
        setIsDark(isNowDark);
    };
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);
    // Handle Logout Event Action
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            setIsOpen(false);
            navigate('/login');
        }
        catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (_jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80", children: [_jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group select-none flex-shrink-0", children: [_jsx("div", { className: "h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 transition-transform group-hover:scale-105", children: _jsx(Sparkles, { className: "h-4 w-4 fill-indigo-200/20" }) }), _jsxs("span", { className: "text-xl font-bold tracking-tight text-slate-900 dark:text-white", children: ["NotePilot", _jsx("span", { className: "text-indigo-600 font-medium", children: "." })] })] }), _jsx("div", { className: "hidden items-center gap-6 md:flex", children: navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (_jsx(Link, { to: link.href, className: `text-sm font-medium transition-colors ${isActive
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'}`, children: link.label }, link.href));
                        }) }), _jsxs("div", { className: "hidden items-center gap-3 md:flex", children: [_jsx("button", { type: "button", onClick: toggleTheme, className: "relative overflow-hidden rounded-xl p-2.5 text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100", "aria-label": "Toggle theme", children: _jsx("div", { className: "transition-transform duration-500 transform-3d backface-hidden", children: isDark ? (_jsx(Sun, { className: "h-4 w-4 text-yellow-500 animate-[spin_10s_linear_infinite]" })) : (_jsx(Moon, { className: "h-4 w-4 text-cyan-500" })) }) }), user ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "group/user relative flex max-w-[120px] hover:max-w-[240px] items-center gap-2 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/50 px-3 py-1.5 transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900/40", children: [_jsx("img", { src: user.image || "/avatar.jpg", alt: user.name || "User", className: "h-5 w-5 flex-shrink-0 rounded-full object-cover ring-1 ring-purple-500/20" }), _jsx("span", { className: "truncate text-xs font-semibold text-slate-700 dark:text-zinc-300 whitespace-nowrap transition-all duration-300", children: user.name || "Active Pilot" })] }), _jsxs("button", { type: "button", onClick: handleLogout, className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30", children: [_jsx(LogOut, { className: "h-4 w-4" }), "Logout"] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Link, { to: "/login", className: "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100", children: [_jsx(LogIn, { className: "h-4 w-4" }), "Login"] }), _jsxs(Link, { to: "/signup", className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-500/10 transition-colors hover:bg-purple-700", children: ["Get Started", _jsx(Sparkles, { className: "h-4 w-4" })] })] }))] }), _jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [_jsx("button", { type: "button", onClick: toggleTheme, className: "rounded-xl p-2.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100", "aria-label": "Toggle theme", children: isDark ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }), _jsx("button", { type: "button", onClick: toggleMenu, className: "rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100", "aria-label": isOpen ? 'Close menu' : 'Open menu', "aria-expanded": isOpen, children: isOpen ? _jsx(X, { className: "h-6 w-6" }) : _jsx(Menu, { className: "h-6 w-6" }) })] })] }), isOpen && (_jsx("div", { className: "border-t border-slate-200 bg-white px-4 pb-6 pt-4 md:hidden animate-in fade-in slide-in-from-top-5 duration-200 dark:border-slate-800 dark:bg-slate-950", children: _jsxs("div", { className: "flex flex-col gap-3", children: [navLinks.map((link) => {
                            const isActive = currentPath === link.href || window.location.pathname === link.href;
                            return (_jsx(Link, { to: link.href, onClick: () => setIsOpen(false), className: `px-3 py-2 text-sm font-medium rounded-xl transition-colors ${isActive
                                    ? 'bg-indigo-50 text-purple-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50'}`, children: link.label }, link.href));
                        }), _jsx("hr", { className: "my-2 border-slate-200 dark:border-slate-800" }), user ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60", children: [_jsx("img", { src: user.image || "/avatar.jpg", alt: user.name || "User", className: "h-6 w-6 rounded-full object-cover" }), _jsx("span", { className: "text-sm font-bold text-slate-800 dark:text-zinc-200", children: user.name })] }), _jsxs("button", { type: "button", onClick: handleLogout, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-950/20", children: [_jsx(LogOut, { className: "h-4 w-4" }), "Logout"] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Link, { to: "/login", onClick: toggleMenu, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900", children: [_jsx(LogIn, { className: "h-4 w-4" }), "Login"] }), _jsxs(Link, { to: "/signup", onClick: toggleMenu, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700", children: ["Get Started", _jsx(Sparkles, { className: "h-4 w-4" })] })] }))] }) }))] }));
};
export default Navbar;
