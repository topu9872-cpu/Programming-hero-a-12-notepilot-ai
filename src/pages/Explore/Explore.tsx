import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  Eye,
  ThumbsUp,
  UserPlus,
  UserCheck,
  Sparkles,
  Code,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Mail,
  BookOpen,
  Terminal,
  Compass,
  Zap,
  Palette,
  Briefcase,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllNotes } from "../../api/ServerRoute";

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface Note {
  _id: string; // Updated to match MongoDB structure
  title: string;
  description: string;
  content?: string;
  category: string;
  coverIcon?: React.ReactNode;
  coverGradient: string;
  coverImage?: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
    isVerified?: boolean;
  };
  readTime: string;
  views: number;
  likes?: number; // Optional since MongoDB object doesn't have it explicitly
  tags: string[];
  isTrending?: boolean;
  aiGenerated?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// Fallback category helper to map dynamic collection data safely
const getIconForCategory = (category: string) => {
  switch (category?.toLowerCase()) {
    case "programming":
      return <Code className="w-4 h-4 text-indigo-500" />;
    case "design":
      return <Palette className="w-4 h-4 text-pink-500" />;
    default:
      return <Terminal className="w-4 h-4 text-slate-500" />;
  }
};

export default function Explore() {
  type SortOption = "all" | "newest" | "oldest" | "mostViewed" | "featured";

  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "all", label: "All" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "mostViewed", label: "Most Viewed" },
    { value: "featured", label: "Featured" },
  ];

  // ==========================================
  // MEMOIZED FILTER LOGIC (Case-insensitive Fix)
  // ==========================================
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (!selectedCategory) return true;
      return (
        note.category?.trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase()
      );
    });
  }, [selectedCategory, notes]);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    const sortParam = (searchParams.get("sort") || "all") as SortOption;
    const searchParam = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category");

    setCurrentPage(Number.isNaN(pageParam) ? 1 : Math.max(1, pageParam));
    setSortOption(
      sortOptions.some((item) => item.value === sortParam)
        ? sortParam
        : "newest",
    );
    setSearchQuery(searchParam);
    setSelectedCategory(categoryParam ? categoryParam : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortOption) params.set("sort", sortOption);
    if (selectedCategory) params.set("category", selectedCategory);
    if (currentPage > 1) params.set("page", String(currentPage));
    setSearchParams(params, { replace: true });
  }, [searchQuery, sortOption, selectedCategory, currentPage, setSearchParams]);

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
        } else if (Array.isArray(data)) {
          // ব্যাকএন্ড থেকে যদি সরাসরি অ্যারে আসে তার ব্যাকআপ হ্যান্ডলিং
          setNotes(data);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [currentPage, searchQuery, sortOption, selectedCategory]);

  // Dynamically group unique categories from MongoDB records
  const uniqueCategories = useMemo(() => {
    const counts: Record<string, number> = {};
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

  return (
    <div className="min-h-screen bg-amber-50/20 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-300 antialiased selection:bg-indigo-200">
      {/* AMBIENT SOFT FRIENDLY GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden opacity-60 dark:opacity-20 z-0">
        <div className="absolute -top-[15%] left-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-indigo-300 to-purple-400 rounded-full blur-[100px]" />
        <div className="absolute -top-[10%] right-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-rose-300 to-amber-300 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* ==========================================
            1. HERO SECTION (FRIENDLY & CLEAN)
           ========================================== */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border bg-white dark:bg-zinc-900 border-indigo-100 dark:border-zinc-800 shadow-sm transition-transform hover:scale-102">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500/20" />
            <span className="text-slate-600 dark:text-zinc-300">
              Welcome to NotePilot Note Hub
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
              Public Notes
            </span>{" "}
            ✨
          </h1>

          <p className="text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Discover beautifully curated technical ideas, friendly roadmaps, and
            micro-summaries built directly inside our active AI workspaces.
          </p>

          {/* SEARCH COMPONENT */}
          <div className="relative max-w-lg mx-auto mt-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-2xl opacity-10 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            <div className="relative flex flex-col gap-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 focus-within:border-indigo-400 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/5 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1 flex items-center rounded-2xl bg-white dark:bg-zinc-900">
                  <Search className="w-4.5 h-4.5 ml-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" />
                  <input
                    type="text"
                    placeholder="Find topics, tags, or creator insights..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-3.5 bg-transparent outline-none text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setCurrentPage(1);
                      }}
                      className="text-xs font-bold mr-3 px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 transition-colors duration-200"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs sm:text-sm">
                  <label htmlFor="sort" className="font-semibold">
                    Sort
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value as SortOption);
                      setCurrentPage(1);
                    }}
                    className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${
                selectedCategory === null
                  ? "bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102"
                  : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
              }`}
            >
              All Logs
            </button>
            {uniqueCategories.map((cat) => {
              const isActive =
                selectedCategory?.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${
                    isActive
                      ? "bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102"
                      : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            2. COMPACT 4-COLUMN FEATURED NOTES GRID
           ========================================== */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-500" />
              <span>Latest Discoveries</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Browse streamlined, dense structural content files shared by the
              network
            </p>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-zinc-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-zinc-700 mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                No notes fit criteria
              </h3>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
                Try modifying your terms or clear the current active category
                chip.
              </p>
            </div>
          ) : (
            /* DENSE 4-COLUMN RESPONSIVE LAYOUT */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredNotes.map((note) => (
                <article
                  key={note._id}
                  className="flex flex-col justify-between p-4.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-zinc-700 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    {/* ACCENT ROW */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition-colors duration-200">
                        {note.coverIcon || getIconForCategory(note.category)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {note.aiGenerated && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                            AI Generated
                          </span>
                        )}
                        {note.isTrending && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wider">
                            <TrendingUp className="w-2.5 h-2.5" /> Hot
                          </span>
                        )}
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                          {note.category}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT COMPACT ROWS */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold tracking-tight text-slate-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150 line-clamp-2 leading-snug">
                        {note.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 font-normal leading-relaxed">
                        {note.description}
                      </p>
                    </div>

                    {/* HASH TAGS ROW */}
                    <div className="flex flex-wrap gap-1">
                      {note.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-indigo-500/80 dark:text-zinc-500 bg-indigo-50/40 dark:bg-transparent px-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM INFO BLOCKS */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={note.coverImage || "/avatar.jpg"}
                          alt={note.author?.name}
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800"
                        />
                        <div className="leading-tight">
                          <p className="text-[11px] font-bold flex items-center gap-0.5 text-slate-800 dark:text-zinc-200">
                            <span className="truncate max-w-[70px]">
                              {note.author?.name?.split(" ")[0] || "User"}
                            </span>
                            {note.author?.isVerified && (
                              <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 fill-blue-500 dark:fill-none" />
                            )}
                          </p>
                          <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-medium">
                            {note.readTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-[10px] font-bold">
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />{" "}
                          {note.views >= 1000
                            ? `${(note.views / 1000).toFixed(0)}k`
                            : note.views || 0}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <ThumbsUp className="w-3 h-3" /> {note.likes || 0}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/explore/${note._id}`}
                      className="w-full inline-flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-100 hover:bg-indigo-600 dark:bg-zinc-800 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-zinc-300 dark:hover:text-white text-[11px] font-bold transition-all duration-200 group/btn shadow-inner"
                    >
                      <span>Read Document</span>
                      <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage <= 1}
                className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
                className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}