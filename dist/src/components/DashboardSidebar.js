import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, NavLink, useParams } from 'react-router-dom';
import { AiOutlineHome, AiOutlineFile, AiOutlineEdit, AiOutlineStar, AiOutlineUser, } from 'react-icons/ai';
import { Sparkles } from 'lucide-react';
const links = [
    // Adding `end: true` tells React Router to match this path exactly
    { to: "/dashboard", icon: AiOutlineHome, text: "Dashboard", end: true },
    { to: "/dashboard/notes", icon: AiOutlineFile, text: "My Notes" },
    { to: "/dashboard/create-note", icon: AiOutlineEdit, text: "Create Note" },
    { to: "/dashboard/favorites", icon: AiOutlineStar, text: "Favorites" },
    { to: "/dashboard/profile", icon: AiOutlineUser, text: "Profile" },
];
const DashboardSidebar = () => {
    // Read parameters like :noteId if your routes use them (e.g., /dashboard/notes/:noteId)
    const { noteId } = useParams();
    return (_jsxs("aside", { className: "w-64 h-screen sticky top-0 bg-slate-50 dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/60 p-5 flex flex-col justify-between select-none transition-colors duration-200", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group select-none mb-6 ", children: [_jsx("div", { className: "h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 transition-transform group-hover:scale-105", children: _jsx(Sparkles, { className: "h-4 w-4 fill-indigo-200/20" }) }), _jsxs("span", { className: "text-xl font-bold tracking-tight text-slate-900 dark:text-white", children: ["NotePilot", _jsx("span", { className: "text-indigo-600 dark:text-indigo-500 font-medium", children: "." })] })] }), _jsx("nav", { children: _jsx("ul", { className: "space-y-1", children: links.map((link, index) => (_jsx("li", { children: _jsx(NavLink, { to: link.to, 
                                    // Pass the end property directly into the NavLink component
                                    end: link.end, className: ({ isActive }) => `
                 hover:scale-102   flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive
                                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'}
                  `, children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx(link.icon, { size: 20, className: `transition-colors duration-200 ${isActive
                                                    ? 'text-indigo-600 dark:text-indigo-400'
                                                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}` }), _jsx("span", { className: "flex-1 truncate", children: link.text }), link.text === "My Notes" && noteId && (_jsx("span", { className: "text-[10px] bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold", children: "OPEN" }))] })) }) }, index))) }) })] }), _jsxs("div", { className: "border-t border-slate-200/60 dark:border-slate-800/60 pt-4 px-2 flex items-center gap-3 transition-colors duration-200", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-semibold text-xs text-slate-700 dark:text-slate-300", children: "U" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-xs font-medium text-slate-700 dark:text-slate-300 truncate", children: "User Account" }), _jsx("p", { className: "text-[10px] text-slate-400 dark:text-slate-500 truncate", children: "pro@notepilot.ai" })] })] })] }));
};
export default DashboardSidebar;
