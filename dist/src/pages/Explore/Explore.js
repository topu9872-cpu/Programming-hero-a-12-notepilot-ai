import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { Search, TrendingUp, Eye, ThumbsUp, Sparkles, Code, CheckCircle2, ArrowRight, BookOpen, Terminal, Compass, Palette, } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllNotes } from "../../api/ServerRoute.js";
// Fallback category helper to map dynamic collection data safely
const getIconForCategory = (category) => {
    switch (category?.toLowerCase()) {
        case "programming":
            return _jsx(Code, { className: "w-4 h-4 text-indigo-500" });
        case "design":
            return _jsx(Palette, { className: "w-4 h-4 text-pink-500" });
        default:
            return _jsx(Terminal, { className: "w-4 h-4 text-slate-500" });
    }
};
export default function Explore() {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOption, setSortOption] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const sortOptions = [
        { value: "all", label: "All" },
        { value: "newest", label: "Newest" },
        { value: "oldest", label: "Oldest" },
        { value: "mostViewed", label: "Most Viewed" },
        { value: "featured", label: "Featured" },
    ];
    // ==========================================
    // MEMOIZED FILTER LOGIC & UNIQUE CATEGORIES
    // ==========================================
    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesCategory = selectedCategory
                ? note.category === selectedCategory
                : true;
            return matchesCategory;
        });
    }, [selectedCategory, notes]);
    useEffect(() => {
        const pageParam = Number(searchParams.get("page") || "1");
        const sortParam = (searchParams.get("sort") || "all");
        const searchParam = searchParams.get("search") || "";
        setCurrentPage(Number.isNaN(pageParam) ? 1 : Math.max(1, pageParam));
        setSortOption(sortOptions.some((item) => item.value === sortParam)
            ? sortParam
            : "newest");
        setSearchQuery(searchParam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery)
            params.set("search", searchQuery);
        if (sortOption)
            params.set("sort", sortOption);
        if (currentPage > 1)
            params.set("page", String(currentPage));
        setSearchParams(params, { replace: true });
    }, [searchQuery, sortOption, currentPage, setSearchParams]);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getAllNotes({
                    page: currentPage,
                    limit: 8,
                    search: searchQuery,
                    sort: sortOption,
                });
                if (data?.notes) {
                    setNotes(data.notes);
                    setTotalPages(data.totalPages || 1);
                    setCurrentPage(data.currentPage || 1);
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchNotes();
    }, [currentPage, searchQuery, sortOption]);
    // Dynamically group unique categories from MongoDB records
    const uniqueCategories = useMemo(() => {
        const counts = {};
        notes.forEach((note) => {
            if (note.category) {
                counts[note.category] = (counts[note.category] || 0) + 1;
            }
        });
        return Object.keys(counts).map((name) => ({
            name,
            count: counts[name],
            icon: getIconForCategory(name),
            gradient: "from-indigo-500/10 to-purple-500/10",
        }));
    }, [notes]);
    useEffect(() => {
        getAllNotes().then((data) => {
            if (Array.isArray(data))
                setNotes(data);
        });
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-amber-50/20 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-300 antialiased selection:bg-indigo-200", children: [_jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden opacity-60 dark:opacity-20 z-0", children: [_jsx("div", { className: "absolute -top-[15%] left-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-indigo-300 to-purple-400 rounded-full blur-[100px]" }), _jsx("div", { className: "absolute -top-[10%] right-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-rose-300 to-amber-300 rounded-full blur-[90px]" })] }), _jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16", children: [_jsxs("section", { className: "text-center max-w-3xl mx-auto space-y-6 pt-4", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border bg-white dark:bg-zinc-900 border-indigo-100 dark:border-zinc-800 shadow-sm transition-transform hover:scale-102", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5 text-indigo-500 fill-indigo-500/20" }), _jsx("span", { className: "text-slate-600 dark:text-zinc-300", children: "Welcome to NotePilot Note Hub" })] }), _jsxs("h1", { className: "text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 leading-tight", children: ["Explore", " ", _jsx("span", { className: "bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent", children: "Public Notes" }), " ", "\u2728"] }), _jsx("p", { className: "text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed", children: "Discover beautifully curated technical ideas, friendly roadmaps, and micro-summaries built directly inside our active AI workspaces." }), _jsxs("div", { className: "relative max-w-lg mx-auto mt-6 group", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-2xl opacity-10 group-hover:opacity-20 blur-md transition-opacity duration-300" }), _jsx("div", { className: "relative flex flex-col gap-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 focus-within:border-indigo-400 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/5 p-4", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [_jsxs("div", { className: "relative flex-1 flex items-center rounded-2xl bg-white dark:bg-zinc-900", children: [_jsx(Search, { className: "w-4.5 h-4.5 ml-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" }), _jsx("input", { type: "text", placeholder: "Find topics, tags, or creator insights...", value: searchQuery, onChange: (e) => {
                                                                setSearchQuery(e.target.value);
                                                                setCurrentPage(1);
                                                            }, className: "w-full px-3 py-3.5 bg-transparent outline-none text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500" }), searchQuery && (_jsx("button", { onClick: () => {
                                                                setSearchQuery("");
                                                                setCurrentPage(1);
                                                            }, className: "text-xs font-bold mr-3 px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 transition-colors duration-200", children: "Reset" }))] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs sm:text-sm", children: [_jsx("label", { htmlFor: "sort", className: "font-semibold", children: "Sort" }), _jsx("select", { id: "sort", value: sortOption, onChange: (e) => {
                                                                setSortOption(e.target.value);
                                                                setCurrentPage(1);
                                                            }, className: "rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400", children: sortOptions.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] })] }) })] }), _jsxs("div", { className: "flex flex-wrap justify-center gap-2 pt-3", children: [_jsx("button", { onClick: () => setSelectedCategory(null), className: `px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${selectedCategory === null
                                            ? "bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102"
                                            : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"}`, children: "All Logs" }), uniqueCategories.map((cat) => {
                                        const isActive = selectedCategory === cat.name;
                                        return (_jsxs("button", { onClick: () => setSelectedCategory(cat.name), className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${isActive
                                                ? "bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102"
                                                : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"}`, children: [cat.icon, _jsx("span", { children: cat.name })] }, cat.name));
                                    })] })] }), _jsxs("section", { className: "space-y-5", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("h2", { className: "text-xl font-black tracking-tight flex items-center gap-2", children: [_jsx(Compass, { className: "w-5 h-5 text-indigo-500" }), _jsx("span", { children: "Latest Discoveries" })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-zinc-400", children: "Browse streamlined, dense structural content files shared by the network" })] }), filteredNotes.length === 0 ? (_jsxs("div", { className: "text-center py-16 bg-white dark:bg-zinc-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm", children: [_jsx(BookOpen, { className: "w-8 h-8 mx-auto text-slate-300 dark:text-zinc-700 mb-2" }), _jsx("h3", { className: "text-sm font-bold text-slate-700 dark:text-zinc-300", children: "No notes fit criteria" }), _jsx("p", { className: "text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto", children: "Try modifying your terms or clear the current active category chip." })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filteredNotes.map((note) => (_jsxs("article", { className: "flex flex-col justify-between p-4.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-zinc-700 transition-all duration-200 group", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition-colors duration-200", children: note.coverIcon || getIconForCategory(note.category) }), _jsxs("div", { className: "flex items-center gap-1.5", children: [note.aiGenerated && (_jsx("span", { className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-wider", children: "AI Generated" })), note.isTrending && (_jsxs("span", { className: "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wider", children: [_jsx(TrendingUp, { className: "w-2.5 h-2.5" }), " Hot"] })), _jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400", children: note.category })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-sm font-bold tracking-tight text-slate-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150 line-clamp-2 leading-snug", children: note.title }), _jsx("p", { className: "text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 font-normal leading-relaxed", children: note.description })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: note.tags?.map((tag) => (_jsxs("span", { className: "text-[10px] font-semibold text-indigo-500/80 dark:text-zinc-500 bg-indigo-50/40 dark:bg-transparent px-1 rounded", children: ["#", tag] }, tag))) })] }), _jsxs("div", { className: "pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: note.coverImage || "/avatar.jpg", alt: note.author?.name, className: "w-7 h-7 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800" }), _jsxs("div", { className: "leading-tight", children: [_jsxs("p", { className: "text-[11px] font-bold flex items-center gap-0.5 text-slate-800 dark:text-zinc-200", children: [_jsx("span", { className: "truncate max-w-[70px]", children: note.author?.name?.split(" ")[0] || "User" }), note.author?.isVerified && (_jsx(CheckCircle2, { className: "w-2.5 h-2.5 text-blue-500 fill-blue-500 dark:fill-none" }))] }), _jsx("span", { className: "text-[9px] text-slate-400 dark:text-zinc-500 font-medium", children: note.readTime })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-[10px] font-bold", children: [_jsxs("span", { className: "flex items-center gap-0.5", children: [_jsx(Eye, { className: "w-3 h-3" }), " ", note.views >= 1000
                                                                            ? `${(note.views / 1000).toFixed(0)}k`
                                                                            : note.views || 0] }), _jsxs("span", { className: "flex items-center gap-0.5", children: [_jsx(ThumbsUp, { className: "w-3 h-3" }), " ", note.likes || 0] })] })] }), _jsxs(Link, { to: `/explore/${note._id}`, className: "w-full inline-flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-100 hover:bg-indigo-600 dark:bg-zinc-800 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-zinc-300 dark:hover:text-white text-[11px] font-bold transition-all duration-200 group/btn shadow-inner", children: [_jsx("span", { children: "Read Document" }), _jsx(ArrowRight, { className: "w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform duration-150" })] })] })] }, note._id))) })), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 mt-6", children: [_jsxs("p", { className: "text-sm text-slate-600 dark:text-zinc-400", children: ["Page ", currentPage, " of ", totalPages] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage <= 1, className: "rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40", children: "Previous" }), _jsx("button", { type: "button", onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage >= totalPages, className: "rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40", children: "Next" })] })] })] })] })] }));
}
