import React, { useState, useMemo, useEffect } from "react";
import {
  RiStarFill,
  RiStarLine,
  RiSearchLine,
  RiFilter3Line,
  RiArrowUpDownLine,
  RiLayoutGridLine,
  RiListCheck,
  RiDeleteBin6Line,
  RiFolderOpenLine,
  RiTimeLine,
  RiEyeLine,
  RiUserLine,
  RiSparkling2Line,
  RiCompass3Line,
} from "react-icons/ri";
import { authClient } from "../lib/auth-client";
import { getUsersFavorite, removeFavorite } from "../api/ServerRoute";

interface NoteAuthor {
  id?: string;
  name?: string;
  avatar?: string;
}

interface Note {
  _id: string;
  title: string;
  description: string;
  category: string;
  coverImage?: string;
  coverGradient?: string;
  author?: NoteAuthor;
  tags: string[];
  readTime: string;
  views: number;
  status?: string;
}

interface FavoriteDocument {
  _id: string;
  note: Note;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

const parseFavoriteDocument = (
  rawNote: any,
  user: { id: string; name?: string | null; email?: string | null },
): FavoriteDocument | null => {
  if (!rawNote || typeof rawNote !== "object") {
    return null;
  }

  // Handle standard document fields vs nested structures from aggregations
  const coreNote = rawNote.note || rawNote;
  const noteId = coreNote._id?.$oid || coreNote._id || coreNote.id || rawNote._id || "";
  const author = coreNote.author || coreNote.user || {};

  const note: Note = {
    _id: String(noteId),
    title: String(coreNote.title || "Untitled note"),
    description: String(coreNote.description || "No description available."),
    category: String(coreNote.category || coreNote.type || "Uncategorized"),
    coverImage: coreNote.coverImage ? String(coreNote.coverImage) : undefined,
    coverGradient: String(
      coreNote.coverGradient || "from-indigo-500 to-purple-600",
    ),
    author: {
      id: author?.id ? String(author.id) : undefined,
      name: String(author?.name || author?.email || "Unknown author"),
      avatar: author?.avatar || author?.image || "",
    },
    tags: Array.isArray(coreNote.tags) ? coreNote.tags.map(String) : [],
    readTime: String(coreNote.readTime || coreNote.read_time || "1 min"),
    views:
      typeof coreNote.views === "number"
        ? coreNote.views
        : Number(coreNote.views) || 0,
    status: coreNote.status ? String(coreNote.status) : undefined,
  };

  if (!note._id) {
    return null;
  }

  return {
    _id: String(rawNote._id || note._id),
    note,
    user: {
      id: user.id,
      name: user.name || null,
      email: user.email || null,
    },
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

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 1. Fetch data on load and update local component state safely
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.id) {
        setFavorites([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const responseData = await getUsersFavorite(user.id);
        // Ensure data is treated as an array regardless of schema structure
        const rawArray = Array.isArray(responseData) ? responseData : responseData?.data || [];
        
        const parsed = rawArray
          .map((item:any) => parseFavoriteDocument(item, user))
          .filter((item: any): item is FavoriteDocument => item !== null);
          
        setFavorites(parsed);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Failed to load your favorite notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user?.id]);

  // 2. Perform safe, non-nested transformations using standard React useMemo
  const filteredFavorites = useMemo(() => {
    let result = favorites.filter((favorite) => {
      const note = favorite.note;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      
      const matchesSearch =
        !normalizedQuery ||
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.description.toLowerCase().includes(normalizedQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      const matchesCategory =
        categoryFilter === "all" || note.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    // Handle interactive sorting array mutations safely
    if (sortBy === "title") {
      result.sort((a, b) => a.note.title.localeCompare(b.note.title));
    } else if (sortBy === "time") {
      result.sort((a, b) => {
        const valA = parseInt(a.note.readTime) || 0;
        const valB = parseInt(b.note.readTime) || 0;
        return valB - valA;
      });
    }

    return result;
  }, [favorites, searchQuery, categoryFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  const handleRemove = async (noteId: string) => {
    if (!user?.id) {
      setError("You must be logged in to remove a favorite.");
      return;
    }

    try {
      await removeFavorite(noteId, user.id);
      setFavorites((current) =>
        current.filter((favorite) => favorite.note._id !== noteId),
      );
    } catch (removeError) {
      console.error(removeError);
      setError("Failed to remove favorite. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-sm">
              <RiStarFill className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight font-display">
              Favorites
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage and access your starred notes quickly.
          </p>
        </div>

        {/* Action Controls Panel */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <input
              type="text"
              placeholder="Search title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative flex items-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Categories</option>
              <option value="work">Work & Projects</option>
              <option value="research">Research & Docs</option>
              <option value="personal">Personal Log</option>
              <option value="ideas">Brainstorming</option>
            </select>
            <RiFilter3Line className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">
              ▼
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="recent">Last Updated</option>
              <option value="title">Alphabetical</option>
              <option value="time">Reading Time</option>
            </select>
            <RiArrowUpDownLine className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">
              ▼
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-500" : "text-slate-400 hover:text-slate-600"}`}
            >
              <RiListCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-500" : "text-slate-400 hover:text-slate-600"}`}
            >
              <RiLayoutGridLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ERROR TEXT FEEDBACK BLOCK */}
      {error && (
        <div className="mb-6 p-4 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
          {error}
        </div>
      )}

      {/* STATISTICS ROW SECTION */}
      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading your space...</div>
      ) : favorites.length > 0 ? (
        <>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">
                Total Favorites
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display">
                  {favorites.length}
                </span>
                <span className="text-xs text-amber-500 font-medium">
                  Starred
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">
                Categories
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display">
                  {new Set(favorites.map((f) => f.note.category)).size}
                </span>
                <span className="text-xs text-slate-400">sectors</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">
                Matching Search
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display text-indigo-500">
                  {filteredFavorites.length}
                </span>
                <span className="text-xs text-slate-400">visible</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">
                Total Tags
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display">
                  {favorites.reduce((acc, current) => acc + current.note.tags.length, 0)}
                </span>
                <span className="text-xs text-indigo-500 font-medium flex items-center gap-0.5">
                  <RiSparkling2Line className="w-3 h-3" /> Index
                </span>
              </div>
            </div>
          </section>

          {/* CORE FAVORITES DATA LAYER */}
          {filteredFavorites.length > 0 ? (
            <section
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
            >
              {filteredFavorites.map((favorite) => {
                const note = favorite.note;
                return (
                  <article
                    key={favorite._id}
                    className="group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-950">
                      {note.coverImage ? (
                        <img
                          src={note.coverImage}
                          alt={note.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${note.coverGradient}`}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/85 to-transparent">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-100">
                          <RiFolderOpenLine className="w-3.5 h-3.5" />
                          {note.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {note.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
                          {note.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {note.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <div className="inline-flex items-center gap-2">
                          <RiTimeLine className="w-4 h-4" />
                          <span>{note.readTime}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <RiEyeLine className="w-4 h-4" />
                          <span>{note.views} views</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0">
                            {note.author?.avatar ? (
                              <img
                                src={note.author.avatar}
                                alt={note.author.name || "Author"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full grid place-items-center text-slate-500">
                                <RiUserLine className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 max-w-[120px] truncate">
                              {note.author?.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Note author
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(note._id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            /* FALLBACK FOR NO ACTIVE FILTER MATCHES */
            <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[350px]">
              <h3 className="text-lg font-semibold mb-1">No matching results</h3>
              <p className="text-sm text-slate-400 max-w-xs mb-6">
                No starred documents match your current text query or filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl cursor-pointer shadow-md shadow-indigo-500/10"
              >
                Clear Search Filters
              </button>
            </div>
          )}
        </>
      ) : (
        /* TOTAL EMPTY STATE COMPONENT */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[420px] shadow-2xs">
          <div className="relative mb-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30 rounded-2xl text-amber-500 shadow-sm">
              <RiStarLine className="w-10 h-10" />
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight font-display mb-1">
            No favorite notes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6 leading-normal">
            Star your important notes so you can access them quickly from this dashboard.
          </p>
          <a
            href="/browse"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md shadow-indigo-500/10 dark:shadow-indigo-950/20"
          >
            <RiCompass3Line className="w-4 h-4" />
            <span>Browse Notes</span>
          </a>
        </div>
      )}
    </div>
  );
}