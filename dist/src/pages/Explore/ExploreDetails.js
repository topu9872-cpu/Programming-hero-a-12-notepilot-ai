import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RiSparkling2Line, RiTimeLine, RiEyeLine, RiCheckboxCircleLine, RiCalendarEventLine, RiHeartLine, RiBookmarkLine, RiUserLine, RiFileList3Line } from 'react-icons/ri';
import { getAllNotesDetails, Notesfavorited, removeFavorite } from '../../api/ServerRoute.js';
import { authClient } from '../../lib/auth-client.js';
import { toast } from 'sonner';
export default function NoteDetails() {
    const { id } = useParams();
    const navigate = useNavigate(); // Fixed client-side routing redirect
    const [note, setNote] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    useEffect(() => {
        if (!id)
            return;
        const fetchNote = async () => {
            try {
                const rawData = await getAllNotesDetails(id);
                if (!rawData) {
                    toast.error("Document data record could not be found.");
                    return;
                }
                const normalizedNote = {
                    ...rawData,
                    // 1. Safeguard ID format conversions
                    _id: rawData._id?.$oid || rawData._id || id,
                    // 2. Safeguard against complete absence of author metadata
                    author: {
                        name: rawData.author?.name || 'Anonymous User',
                        avatar: rawData.author?.image || rawData.author?.avatar || '',
                        bio: rawData.author?.bio || 'Workspace member',
                        isVerified: !!rawData.author?.isVerified
                    },
                    // 3. Guarantee tags fallback to an empty collection to block processing failures
                    tags: Array.isArray(rawData.tags) ? rawData.tags : [],
                    // 4. Guarantee foundational metrics fall back to zero safely
                    views: typeof rawData.views === 'number' ? rawData.views : 0,
                    readTime: rawData.readTime || '1 min',
                    coverGradient: rawData.coverGradient || 'from-indigo-500 to-purple-600'
                };
                setNote(normalizedNote);
            }
            catch (error) {
                console.error("Critical content load exception:", error);
                toast.error("An error occurred while building document contents.");
                // Break the indefinite loader cycle by setting a structural empty state
                setNote(null);
            }
        };
        fetchNote();
    }, [id]);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const handleFavorite = async () => {
        if (!note) {
            toast.error("Note not found");
            return;
        }
        if (!user) {
            toast.error("Please login to save favorite notes");
            navigate('/login'); // Standard React Router programmatic navigation
            return;
        }
        try {
            if (isFavorited) {
                await removeFavorite(note._id, user.id);
                setIsFavorited(false);
                toast.success("Removed from favorites");
            }
            else {
                await Notesfavorited({
                    isFavoritedData: new Date(),
                    isFavorited: true,
                    note,
                    user,
                });
                setIsFavorited(true);
                toast.success("Added to favorites");
            }
        }
        catch (error) {
            if (error?.response?.status === 409 || error?.message?.includes('Already favorited')) {
                toast.error("This note is already in your favorites");
                setIsFavorited(true);
            }
            else {
                toast.error("Something went wrong");
            }
            console.error("Favorite action failed:", error);
        }
    };
    if (!note) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400 font-sans antialiased", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" }), _jsx("p", { className: "text-xs font-semibold tracking-wide", children: "Loading note content..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased", children: _jsxs("div", { className: "max-w-4xl mt-16 mx-auto space-y-6", children: [_jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm", children: [_jsx("div", { className: `absolute inset-0 bg-gradient-to-r ${note.coverGradient || 'from-indigo-500/10 to-purple-500/10'} opacity-[0.07] dark:opacity-[0.12] z-0` }), _jsxs("div", { className: "relative p-6 sm:p-8 lg:p-10 z-10 space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 shadow-2xs", children: note.category }), note.aiGenerated && (_jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30", children: [_jsx(RiSparkling2Line, { className: "w-3.5 h-3.5 animate-pulse" }), _jsx("span", { children: "AI Generated" })] })), note.featured && (_jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30", children: [_jsx(RiBookmarkLine, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Featured" })] }))] }), _jsx("h1", { className: "text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white", children: note.title }), _jsx("p", { className: "text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-3xl font-medium leading-relaxed", children: note.description })] })] }), _jsx("main", { className: "space-y-6", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-850", children: [_jsxs("div", { className: "flex items-center gap-3.5", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `absolute inset-0 bg-gradient-to-tr ${note.coverGradient || 'from-indigo-500/10 to-purple-500/10'} rounded-xl blur-xs opacity-40` }), _jsx("div", { className: "relative w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-white dark:border-slate-700 shadow-xs", children: note.author?.avatar ? (_jsx("img", { src: note.author.avatar, alt: note.author.name, className: "w-full h-full object-cover" })) : (_jsx(RiUserLine, { className: "w-5 h-5 text-slate-400 dark:text-slate-500" })) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-slate-800 dark:text-slate-200", children: note.author.name }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 font-medium", children: note.author.bio })] })] }), _jsx("div", { className: "flex justify-end", children: _jsxs("button", { type: "button", onClick: handleFavorite, className: `w-full sm:w-auto flex items-center justify-center gap-2.5 p-2.5 px-6 text-xs font-medium rounded-xl border transition-all ${isFavorited
                                                ? 'border-red-200 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 shadow-2xs'
                                                : 'border-slate-150 dark:border-slate-850 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/40 '}`, children: [_jsx(RiHeartLine, { className: `w-4 h-4 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-slate-400'}` }), _jsx("span", { children: isFavorited ? 'Favorited' : 'Add to Favorites' })] }) })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]", children: [_jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiTimeLine, { className: "w-4 h-4 text-slate-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Read Time" }), _jsx("div", { className: "font-semibold text-slate-700 dark:text-slate-300", children: note.readTime })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiEyeLine, { className: "w-4 h-4 text-slate-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Metrics" }), _jsxs("div", { className: "font-semibold text-slate-700 dark:text-slate-300", children: [note.views, " views"] })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiCheckboxCircleLine, { className: "w-4 h-4 text-emerald-500" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Lifecycle" }), _jsx("div", { className: "font-bold text-emerald-600 dark:text-emerald-400", children: note.status || 'Active' })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiCalendarEventLine, { className: "w-4 h-4 text-slate-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Created" }), _jsx("div", { className: "font-semibold text-slate-700 dark:text-slate-300", children: note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A' })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiCalendarEventLine, { className: "w-4 h-4 text-slate-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Updated" }), _jsx("div", { className: "font-semibold text-slate-700 dark:text-slate-300", children: note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'N/A' })] })] }), _jsxs("div", { className: "flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60", children: [_jsx(RiCalendarEventLine, { className: "w-4 h-4 text-slate-400" }), _jsxs("div", { children: [_jsx("div", { className: "text-slate-400 text-[9px] uppercase tracking-wider", children: "Published" }), _jsx("div", { className: "font-semibold text-slate-700 dark:text-slate-300", children: note.publishedAt ? new Date(note.publishedAt).toLocaleDateString() : "N/A" })] })] })] }), _jsx("div", { className: "flex flex-wrap gap-1.5 pt-2", children: note.tags?.map((tag, idx) => (_jsxs("span", { className: "inline-flex items-center px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 cursor-default", children: ["#", tag] }, idx))) }), _jsx("article", { className: "prose prose-slate dark:prose-invert max-w-none pt-4 border-t border-slate-100 dark:border-slate-850 text-slate-800 dark:text-slate-200", children: _jsx("div", { className: "text-base sm:text-lg leading-relaxed space-y-6", children: note.content ? (_jsx("div", { dangerouslySetInnerHTML: { __html: note.content } })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "font-medium text-slate-900 dark:text-slate-100", children: "Why subgrid is the true game-changer for dynamic multi-column card designs..." }), _jsxs("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2", children: [_jsx(RiFileList3Line, { className: "w-5 h-5 text-indigo-500" }), "The Core Engine Architecture"] }), _jsx("p", { children: "When working inside traditional CSS Grid models, columns and rows are isolated to the direct parent container." }), _jsx("blockquote", { className: "border-l-4 border-purple-500 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-r-xl my-6 text-sm italic text-slate-600 dark:text-slate-400 font-medium shadow-xs", children: "\"Subgrid allows nested grids to participate in the sizing parameters defined on the main track layout...\"" })] })) }) })] }) })] }) }));
}
