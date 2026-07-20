import React, { useState, useMemo, useEffect } from "react";
import {
  RiStarFill, RiStarLine, RiSearchLine, RiFilter3Line,
  RiArrowUpDownLine, RiLayoutGridLine, RiListCheck,
  RiDeleteBin6Line, RiFolderOpenLine, RiTimeLine,
  RiEyeLine, RiUserLine, RiSparkling2Line, RiCompass3Line, RiAlertLine
} from "react-icons/ri";
import { authClient } from "../lib/auth-client.js";
import { getUsersFavorite, removeFavorite } from "../api/ServerRoute.js";

interface Note {
  _id: string; title: string;createdAt?: Date | string; description: string; category: string;
  coverImage?: string; coverGradient?: string; tags: string[];
  readTime: string; views: number; author?: { id?: string; name?: string; avatar?: string };
}
export interface FavoriteDocument { _id: string; note: Note; user: { id: string; name?: string | null; email?: string | null } }

const parseFavoriteDocument = (raw: any, user: any): FavoriteDocument | null => {
  const core = raw?.note || raw;
  if (!core?._id) return null;
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
  const [favorites, setFavorites] = useState<FavoriteDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track note currently queued for deletion
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user?.id) return setFavorites([]);
    (async () => {
      setLoading(true); setError(null);
      try {
        const res = await getUsersFavorite(user.id);
        const rawArray = Array.isArray(res) ? res : res?.data || [];
        setFavorites(rawArray.map((item: any) => parseFavoriteDocument(item, user)).filter(Boolean) as FavoriteDocument[]);
      } catch {
        setError("Failed to load favorites.");
      } finally { setLoading(false); }
    })();
  }, [user?.id]);

  const filteredFavorites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return favorites
      .filter(({ note }) => 
        (!query || note.title.toLowerCase().includes(query) || note.description.toLowerCase().includes(query) || note.tags.some(t => t.toLowerCase().includes(query))) &&
        (categoryFilter === "all" || note.category.toLowerCase() === categoryFilter.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "title") return a.note.title.localeCompare(b.note.title);
        if (sortBy === "time") return (parseInt(b.note.readTime) || 0) - (parseInt(a.note.readTime) || 0);
        return 0;
      });
  }, [favorites, searchQuery, categoryFilter, sortBy]);

  const handleRemove = async () => {
    if (!deletingId) return;
    if (!user?.id) {
      setError("Please log in first.");
      setDeletingId(null);
      return;
    }
    try {
      await removeFavorite(deletingId, user.id);
      setFavorites(prev => prev.filter(f => f.note._id !== deletingId));
    } catch { 
      setError("Failed to remove favorite."); 
    } finally {
      setDeletingId(null);
    }
  };

  const selectedDeleteNoteTitle = useMemo(() => {
    return favorites.find(f => f.note._id === deletingId)?.note.title || "this note";
  }, [deletingId, favorites]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-8 max-w-7xl mx-auto transition-colors duration-200">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 tracking-tight">
            <span className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20"><RiStarFill className="w-6 h-6" /></span>
            Favorites
          </h1>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">Quick access to your curated thoughts.</p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-initial min-w-[220px]">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input type="text" placeholder="Search title or tags..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
          </div>

          {[
            { value: categoryFilter, onChange: setCategoryFilter, icon: <RiFilter3Line />, options: [['all', 'All Categories'], ['work', 'Work'], ['research', 'Research'], ['personal', 'Personal'], ['ideas', 'Brainstorming']] },
            { value: sortBy, onChange: setSortBy, icon: <RiArrowUpDownLine />, options: [['recent', 'Recent'], ['title', 'Alphabetical'], ['time', 'Reading Time']] }
          ].map((select, idx) => (
            <div key={idx} className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
              <span className="absolute left-3 text-slate-400 pointer-events-none">{select.icon}</span>
              <select value={select.value} onChange={(e) => select.onChange(e.target.value)} className="pl-9 pr-8 py-2 text-sm appearance-none bg-transparent cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                {select.options.map(([val, label]) => <option key={val} value={val} className="dark:bg-slate-900">{label}</option>)}
              </select>
            </div>
          ))}

          <div className="hidden sm:flex p-1 bg-slate-200/60 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['grid', 'list'] as const).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)} className={`p-1.5 rounded-lg transition-all ${viewMode === mode ? "bg-white dark:bg-slate-800 shadow-xs text-indigo-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}>
                {mode === 'grid' ? <RiLayoutGridLine className="w-4 h-4" /> : <RiListCheck className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {error && <div className="mb-6 p-4 rounded-xl text-sm bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400 gap-2 animate-pulse"><RiSparkling2Line className="animate-spin" /> Loading your digital space...</div>
      ) : favorites.length > 0 ? (
        <>
          {/* STATS PANEL */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Saved", val: favorites.length, sub: "Starred items" },
              { label: "Categories", val: new Set(favorites.map(f => f.note.category)).size, sub: "Unique topics" },
              { label: "Filtered", val: filteredFavorites.length, sub: "Matches active filters", highlight: true },
              { label: "Total tags", val: favorites.reduce((acc, f) => acc + f.note.tags.length, 0), sub: "Indexed words" }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                <div className="text-2xl font-bold mt-1 flex items-baseline gap-1.5">
                  <span className={stat.highlight ? "text-indigo-500" : ""}>{stat.val}</span>
                  <span className="text-xs font-normal text-slate-400">{stat.sub}</span>
                </div>
              </div>
            ))}
          </section>

          {/* DOCUMENT CARDS GRID/LIST */}
          {filteredFavorites.length > 0 ? (
            <section className={viewMode === "grid" ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
              {filteredFavorites.map(({ _id, note }) => (
                <article key={_id} className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-300 flex ${viewMode === 'grid' ? 'flex-col rounded-3xl overflow-hidden hover:-translate-y-1' : 'flex-row items-center p-4 rounded-2xl gap-4'}`}>
                  
                  {/* Card Visual Header */}
                  <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-950 shrink-0 ${viewMode === 'grid' ? 'h-44 w-full' : 'h-24 w-24 rounded-xl'}`}>
                    {note.coverImage ? (
                      <img src={note.coverImage} alt={note.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${note.coverGradient}`} />
                    )}
                    {viewMode === 'grid' && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-white tracking-wide uppercase">
                        <RiFolderOpenLine /> {note.category}
                      </span>
                    )}
                  </div>

                  {/* Card Content body */}
                  <div className={`flex-1 flex flex-col justify-between ${viewMode === 'grid' ? 'p-5 space-y-4' : 'h-full'}`}>
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors line-clamp-1">{note.title}</h2>
                        {viewMode === 'list' && <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">{note.category}</span>}
                      </div>
                      <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 ${viewMode === 'grid' ? 'line-clamp-3' : 'hidden sm:line-clamp-2'}`}>{note.description}</p>
                    </div>

                    {/* Meta tags and properties */}
                    <div className="space-y-3 mt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {note.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">#{tag}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><RiTimeLine /> {note.readTime}</span>
                          <span className="flex items-center gap-1"><RiEyeLine /> {note.views}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            {note.author?.avatar ? (
                              <img src={note.author.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                            ) : (
                              <RiUserLine className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="font-medium max-w-[80px] truncate hidden sm:inline">{note.author?.name}</span>
                          </div>
                          
                          {/* Triggers Modal via setting State */}
                          <button onClick={() => setDeletingId(note._id)} title="Remove from favorites"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer">
                            <RiDeleteBin6Line className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[300px]">
              <h3 className="text-lg font-bold">No items found</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-1 mb-4">No starred documents match your selected search queries or filter attributes.</p>
              <button onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }} className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl shadow-xs">Clear Filter Rules</button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[400px] shadow-2xs">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 rounded-2xl text-amber-500 mb-4 animate-bounce">
            <RiStarLine className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold">Your vault is empty</h3>
          <p className="text-sm text-slate-400 max-w-xs mt-1 mb-6">Star your important workspace notes to pin them instantly inside this dashboard.</p>
          <a href="/browse" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-md shadow-indigo-500/10">
            <RiCompass3Line className="w-4 h-4" /> Browse Notebooks
          </a>
        </div>
      )}

      {/* CONFIRM DELETE MODAL BACKDROP */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-4 scale-100 transition-transform">
            
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 shrink-0">
                <RiAlertLine className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">Remove Favorite?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Are you sure you want to remove <span className="font-semibold text-slate-800 dark:text-slate-200">"{selectedDeleteNoteTitle}"</span> from your favorites shelf?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800/60 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleRemove}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm cursor-pointer transition-colors">
                Confirm Removal
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}