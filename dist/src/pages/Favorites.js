import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { RiStarFill, RiStarLine, RiSearchLine, RiFilter3Line, RiArrowUpDownLine, RiLayoutGridLine, RiListCheck, RiDeleteBin6Line, RiFolderOpenLine, RiTimeLine, RiEyeLine, RiUserLine, RiSparkling2Line, RiCompass3Line, RiAlertLine } from "react-icons/ri";
import { authClient } from "../lib/auth-client.js";
import { getUsersFavorite, removeFavorite } from "../api/ServerRoute.js";
const parseFavoriteDocument = (raw, user) => {
    const core = raw?.note || raw;
    if (!core?._id)
        return null;
    const author = core.author || core.user || {};
    return {
        _id: String(raw._id || core._id),
        user: { id: user.id, name: user.name || null, email: user.email || null },
        note: {
            _id: String(core._id?.$oid || core._id),
            title: String(core.title || "Untitled"),
            description: String(core.description || "No description."),
            category: String(core.category || core.type || "Uncategorized"),
            coverImage: core.coverImage ? String(core.coverImage) : undefined,
            coverGradient: String(core.coverGradient || "from-indigo-500 to-purple-600"),
            tags: Array.isArray(core.tags) ? core.tags.map(String) : [],
            readTime: String(core.readTime || core.read_time || "1 min"),
            views: Number(core.views) || 0,
            author: { id: author.id, name: String(author.name || author.email || "Unknown"), avatar: author.avatar || author.image || "" }
        }
    };
};
export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("recent");
    const [viewMode, setViewMode] = useState("grid");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Track note currently queued for deletion
    const [deletingId, setDeletingId] = useState(null);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    useEffect(() => {
        if (!user?.id)
            return setFavorites([]);
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getUsersFavorite(user.id);
                const rawArray = Array.isArray(res) ? res : res?.data || [];
                setFavorites(rawArray.map((item) => parseFavoriteDocument(item, user)).filter(Boolean));
            }
            catch {
                setError("Failed to load favorites.");
            }
            finally {
                setLoading(false);
            }
        })();
    }, [user?.id]);
    const filteredFavorites = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return favorites
            .filter(({ note }) => (!query || note.title.toLowerCase().includes(query) || note.description.toLowerCase().includes(query) || note.tags.some(t => t.toLowerCase().includes(query))) &&
            (categoryFilter === "all" || note.category.toLowerCase() === categoryFilter.toLowerCase()))
            .sort((a, b) => {
            if (sortBy === "title")
                return a.note.title.localeCompare(b.note.title);
            if (sortBy === "time")
                return (parseInt(b.note.readTime) || 0) - (parseInt(a.note.readTime) || 0);
            return 0;
        });
    }, [favorites, searchQuery, categoryFilter, sortBy]);
    const handleRemove = async () => {
        if (!deletingId)
            return;
        if (!user?.id) {
            setError("Please log in first.");
            setDeletingId(null);
            return;
        }
        try {
            await removeFavorite(deletingId, user.id);
            setFavorites(prev => prev.filter(f => f.note._id !== deletingId));
        }
        catch {
            setError("Failed to remove favorite.");
        }
        finally {
            setDeletingId(null);
        }
    };
    const selectedDeleteNoteTitle = useMemo(() => {
        return favorites.find(f => f.note._id === deletingId)?.note.title || "this note";
    }, [deletingId, favorites]);
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-8 max-w-7xl mx-auto transition-colors duration-200", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2 tracking-tight", children: [_jsx("span", { className: "p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20", children: _jsx(RiStarFill, { className: "w-6 h-6" }) }), "Favorites"] }), _jsx("p", { className: "text-sm text-slate-500 mt-1 dark:text-slate-400", children: "Quick access to your curated thoughts." })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs("div", { className: "relative flex-1 sm:flex-initial min-w-[220px]", children: [_jsx(RiSearchLine, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" }), _jsx("input", { type: "text", placeholder: "Search title or tags...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" })] }), [
                                { value: categoryFilter, onChange: setCategoryFilter, icon: _jsx(RiFilter3Line, {}), options: [['all', 'All Categories'], ['work', 'Work'], ['research', 'Research'], ['personal', 'Personal'], ['ideas', 'Brainstorming']] },
                                { value: sortBy, onChange: setSortBy, icon: _jsx(RiArrowUpDownLine, {}), options: [['recent', 'Recent'], ['title', 'Alphabetical'], ['time', 'Reading Time']] }
                            ].map((select, idx) => (_jsxs("div", { className: "relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs", children: [_jsx("span", { className: "absolute left-3 text-slate-400 pointer-events-none", children: select.icon }), _jsx("select", { value: select.value, onChange: (e) => select.onChange(e.target.value), className: "pl-9 pr-8 py-2 text-sm appearance-none bg-transparent cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20", children: select.options.map(([val, label]) => _jsx("option", { value: val, className: "dark:bg-slate-900", children: label }, val)) })] }, idx))), _jsx("div", { className: "hidden sm:flex p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800", children: ['grid', 'list'].map((mode) => (_jsx("button", { onClick: () => setViewMode(mode), className: `p-1.5 rounded-lg transition-all ${viewMode === mode ? "bg-white dark:bg-slate-800 shadow-xs text-indigo-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`, children: mode === 'grid' ? _jsx(RiLayoutGridLine, { className: "w-4 h-4" }) : _jsx(RiListCheck, { className: "w-4 h-4" }) }, mode))) })] })] }), error && _jsx("div", { className: "mb-6 p-4 rounded-xl text-sm bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30", children: error }), loading ? (_jsxs("div", { className: "flex justify-center items-center py-20 text-slate-400 gap-2 animate-pulse", children: [_jsx(RiSparkling2Line, { className: "animate-spin" }), " Loading your digital space..."] })) : favorites.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
                            { label: "Total Saved", val: favorites.length, sub: "Starred items" },
                            { label: "Categories", val: new Set(favorites.map(f => f.note.category)).size, sub: "Unique topics" },
                            { label: "Filtered", val: filteredFavorites.length, sub: "Matches active filters", highlight: true },
                            { label: "Total tags", val: favorites.reduce((acc, f) => acc + f.note.tags.length, 0), sub: "Indexed words" }
                        ].map((stat, i) => (_jsxs("div", { className: "bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs", children: [_jsx("span", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider block", children: stat.label }), _jsxs("div", { className: "text-2xl font-bold mt-1 flex items-baseline gap-1.5", children: [_jsx("span", { className: stat.highlight ? "text-indigo-500" : "", children: stat.val }), _jsx("span", { className: "text-xs font-normal text-slate-400", children: stat.sub })] })] }, i))) }), filteredFavorites.length > 0 ? (_jsx("section", { className: viewMode === "grid" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4", children: filteredFavorites.map(({ _id, note }) => (_jsxs("article", { className: `group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-300 flex ${viewMode === 'grid' ? 'flex-col rounded-3xl overflow-hidden hover:-translate-y-1' : 'flex-row items-center p-4 rounded-2xl gap-4'}`, children: [_jsxs("div", { className: `relative overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0 ${viewMode === 'grid' ? 'h-44 w-full' : 'h-24 w-24 rounded-xl'}`, children: [note.coverImage ? (_jsx("img", { src: note.coverImage, alt: note.title, className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" })) : (_jsx("div", { className: `w-full h-full bg-gradient-to-tr ${note.coverGradient}` })), viewMode === 'grid' && (_jsxs("span", { className: "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-white tracking-wide uppercase", children: [_jsx(RiFolderOpenLine, {}), " ", note.category] }))] }), _jsxs("div", { className: `flex-1 flex flex-col justify-between ${viewMode === 'grid' ? 'p-5 space-y-4' : 'h-full'}`, children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-start gap-2", children: [_jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors line-clamp-1", children: note.title }), viewMode === 'list' && _jsx("span", { className: "text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500", children: note.category })] }), _jsx("p", { className: `text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 ${viewMode === 'grid' ? 'line-clamp-3' : 'hidden sm:line-clamp-2'}`, children: note.description })] }), _jsxs("div", { className: "space-y-3 mt-2", children: [_jsx("div", { className: "flex flex-wrap gap-1.5", children: note.tags.slice(0, 3).map(tag => (_jsxs("span", { className: "text-[11px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md", children: ["#", tag] }, tag))) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(RiTimeLine, {}), " ", note.readTime] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(RiEyeLine, {}), " ", note.views] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-slate-600 dark:text-slate-300", children: [note.author?.avatar ? (_jsx("img", { src: note.author.avatar, alt: "Avatar", className: "w-5 h-5 rounded-full object-cover" })) : (_jsx(RiUserLine, { className: "w-4 h-4 text-slate-400" })), _jsx("span", { className: "font-medium max-w-[80px] truncate hidden sm:inline", children: note.author?.name })] }), _jsx("button", { onClick: () => setDeletingId(note._id), title: "Remove from favorites", className: "p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer", children: _jsx(RiDeleteBin6Line, { className: "w-4 h-4" }) })] })] })] })] })] }, _id))) })) : (_jsxs("div", { className: "flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[300px]", children: [_jsx("h3", { className: "text-lg font-bold", children: "No items found" }), _jsx("p", { className: "text-sm text-slate-400 max-w-xs mt-1 mb-4", children: "No starred documents match your selected search queries or filter attributes." }), _jsx("button", { onClick: () => { setSearchQuery(""); setCategoryFilter("all"); }, className: "px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl shadow-xs", children: "Clear Filter Rules" })] }))] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[400px] shadow-2xs", children: [_jsx("div", { className: "p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-amber-500 mb-4 animate-bounce", children: _jsx(RiStarLine, { className: "w-10 h-10" }) }), _jsx("h3", { className: "text-xl font-bold", children: "Your vault is empty" }), _jsx("p", { className: "text-sm text-slate-400 max-w-xs mt-1 mb-6", children: "Star your important workspace notes to pin them instantly inside this dashboard." }), _jsxs("a", { href: "/browse", className: "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/10", children: [_jsx(RiCompass3Line, { className: "w-4 h-4" }), " Browse Notebooks"] })] })), deletingId && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-fade-in", children: _jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-4 scale-100 transition-transform", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: "p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 shrink-0", children: _jsx(RiAlertLine, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-slate-950 dark:text-white", children: "Remove Favorite?" }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: ["Are you sure you want to remove ", _jsxs("span", { className: "font-semibold text-slate-800 dark:text-slate-200", children: ["\"", selectedDeleteNoteTitle, "\""] }), " from your favorites shelf?"] })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [_jsx("button", { type: "button", onClick: () => setDeletingId(null), className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/60 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleRemove, className: "px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm cursor-pointer transition-colors", children: "Confirm Removal" })] })] }) }))] }));
}
