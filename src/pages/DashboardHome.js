import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, } from "recharts";
import { RiSparkling2Line, RiFileList3Line, RiHeartFill, RiRidingLine, } from "react-icons/ri";
import { authClient } from "../lib/auth-client";
import { NavLink } from "react-router-dom";
import { getDashboardNotes, getUsersFavorite, } from "../api/ServerRoute";
// Graph Metric Streams
const KNOWLEDGE_VELOCITY_DATA = [
    { day: "Mon", words: 1200, aiQueries: 4 },
    { day: "Tue", words: 2800, aiQueries: 12 },
    { day: "Wed", words: 1900, aiQueries: 7 },
    { day: "Thu", words: 4200, aiQueries: 19 },
    { day: "Fri", words: 3100, aiQueries: 14 },
    { day: "Sat", words: 5580, aiQueries: 26 },
    { day: "Sun", words: 2400, aiQueries: 9 },
];
// Helper Tooltip Component
const CustomTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
        return (_jsxs("div", { className: "bg-slate-900/95 border border-slate-700/50 px-3 py-2 rounded-lg shadow-xl backdrop-blur-sm", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1", children: label }), _jsxs("p", { className: "text-sm font-bold text-white", children: [payload[0].value.toLocaleString(), " ", _jsx("span", { className: "text-slate-400 font-normal", children: unit })] })] }));
    }
    return null;
};
export default function DashboardHomePage() {
    const [notes, setNotes] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    useEffect(() => {
        getDashboardNotes(user?.id).then((data) => {
            setNotes(data.notes || []);
        });
        getUsersFavorite(user?.id).then((data) => {
            setFavorite(data || []);
        });
    }, [user?.id]);
    const aiGenerated = notes.filter((data) => data.aiGenerated === true).length || 0;
    const thisWeekNotes = notes.filter((note) => {
        if (!note.createdAt)
            return false;
        const createdAt = new Date(note.createdAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return createdAt >= oneWeekAgo;
    }).length;
    const totalReadTime = notes.reduce((total, note) => {
        const readValue = note.readTime || "0 min";
        return total + Number(readValue.replace(" min", ""));
    }, 0);
    console.log(notes);
    const now = new Date();
    const favoriteNotesThisMonth = favorite.filter((item) => {
        if (!item?.isFavoritedData)
            return false;
        const createdAt = new Date(item.isFavoritedData);
        return (createdAt.getMonth() === now.getMonth() &&
            createdAt.getFullYear() === now.getFullYear());
    }).length;
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20", children: [_jsxs("header", { className: "relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 mb-8 shadow-xs overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" }), _jsxs("div", { className: "relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "max-w-2xl space-y-3", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold font-mono text-indigo-600 bg-indigo-50/60 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-full border border-indigo-100/30 dark:border-indigo-900/30", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), "NotePilot AI Dashboard"] }), _jsxs("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent", children: ["Welcome back,", _jsx("span", { className: "ml-2 font-semibold text-xl sm:text-2xl opacity-90", children: user?.name || "Explorer" })] }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl", children: "Organize your notes, generate AI summaries, and track learning progress." })] }), _jsxs(NavLink, { to: "/dashboard/create-note", className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-5 py-3 text-sm font-medium text-white transition-all shadow-lg shadow-indigo-500/20", children: [_jsx(RiFileList3Line, { className: "text-lg" }), " Create Note"] })] })] }), _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs space-y-3", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-semibold text-slate-400 uppercase", children: "Total Notes" }), _jsxs("div", { className: "flex items-baseline gap-2 mt-0.5", children: [_jsx("span", { className: "text-2xl font-bold", children: notes.length || 0 }), _jsxs("span", { className: "text-[10px] text-emerald-500 font-medium flex items-center", children: [_jsx(RiRidingLine, {}), " +", thisWeekNotes] })] })] }), _jsx("div", { className: "p-2 bg-indigo-500/5 rounded-xl text-indigo-500", children: _jsx(RiFileList3Line, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "h-16 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: KNOWLEDGE_VELOCITY_DATA, children: [_jsx(Tooltip, { content: _jsx(CustomTooltip, { unit: "words" }) }), _jsx(Area, { type: "monotone", dataKey: "words", stroke: "#6366f1", fill: "#6366f1", fillOpacity: 0.1 })] }) }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs space-y-3", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-semibold text-slate-400 uppercase", children: "AI Usage" }), _jsxs("div", { className: "flex items-baseline gap-2 mt-0.5", children: [_jsx("span", { className: "text-2xl font-bold text-purple-500", children: aiGenerated }), _jsx("span", { className: "text-xs text-slate-400", children: "Summaries" })] })] }), _jsx("div", { className: "p-2 bg-purple-500/5 rounded-xl text-purple-500", children: _jsx(RiSparkling2Line, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "h-16 w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: KNOWLEDGE_VELOCITY_DATA, children: [_jsx(Tooltip, { content: ({ active, payload, label }) => active && payload ? (_jsxs("div", { className: "bg-purple-900 text-white text-[10px] p-2 rounded-md", children: [label, ": ", payload[0].value, " AI Queries"] })) : null }), _jsx(Bar, { dataKey: "aiQueries", children: KNOWLEDGE_VELOCITY_DATA.map((_, i) => _jsx(Cell, { fill: i === 5 ? "#9333ea" : "#c084fc" }, i)) })] }) }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs flex flex-col justify-between", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-semibold text-slate-400 uppercase", children: "Favorites" }), _jsx("span", { className: "text-2xl font-bold block text-pink-500", children: favorite.length || 0 })] }), _jsx("div", { className: "p-2 bg-pink-500/5 rounded-xl text-pink-500", children: _jsx(RiHeartFill, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "space-y-3 text-xs border-t pt-3 border-slate-100 dark:border-slate-800", children: _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-500", children: "This Month" }), _jsxs("span", { className: "font-semibold text-pink-500", children: ["+", favoriteNotesThisMonth] })] }) })] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Knowledge Velocity Index" }), _jsxs("div", { className: "flex items-baseline gap-3 mt-1", children: [_jsx("p", { className: "text-xl font-bold", children: totalReadTime }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Total words processed this week" })] })] }), _jsx("div", { className: "h-48 w-full pt-2", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: KNOWLEDGE_VELOCITY_DATA, margin: { top: 10, right: 10, left: -20, bottom: 0 }, children: [_jsx(XAxis, { dataKey: "day", stroke: "#94a3b8", fontSize: 10, axisLine: false, tickLine: false }), _jsx(YAxis, { stroke: "#94a3b8", fontSize: 10, axisLine: false, tickLine: false }), _jsx(Tooltip, { content: _jsx(CustomTooltip, { unit: "words" }) }), _jsx(Area, { type: "monotone", dataKey: "words", stroke: "#6366f1", strokeWidth: 2, fill: "#6366f1", fillOpacity: 0.1 })] }) }) })] })] }));
}
