import React, { useState, useMemo } from 'react';
import { 
  RiStarFill, 
  RiStarLine,
  RiSearchLine, 
  RiFilter3Line, 
  RiArrowUpDownLine, 
  RiLayoutGridLine, 
  RiListCheck, 
  RiBookOpenLine, 
  RiEditLine, 
  RiDeleteBin6Line, 
  RiMore2Fill,
  RiFolderOpenLine,
  RiPriceTag3Line,
  RiTimeLine,
  RiCalendarLine,
  RiCompass3Line,
  RiSparkling2Line
} from 'react-icons/ri';

// Initial Mock Structural Dataset
const INITIAL_FAVORITES = [
  {
    id: '1',
    title: 'Q3 Product Strategy & AI Integration Roadmap',
    category: 'Work & Projects',
    categoryKey: 'work',
    tags: ['roadmap', 'ai-ux', 'gemini'],
    readingTime: '5 min read',
    readingMinutes: 5,
    lastUpdated: 'Today, 10:42 AM',
    timestamp: 1784371320000, // July 2026 Epoch Approximation
    status: 'Published'
  },
  {
    id: '2',
    title: 'Neural Architecture Research & Context Window Notes',
    category: 'Research & Docs',
    categoryKey: 'research',
    tags: ['llm', 'transformers'],
    readingTime: '12 min read',
    readingMinutes: 12,
    lastUpdated: 'Yesterday',
    timestamp: 1784284920000,
    status: 'Draft'
  },
  {
    id: '3',
    title: 'Personal Weekly Reflection & Mental Clarity Logs',
    category: 'Personal Log',
    categoryKey: 'personal',
    tags: ['reflection', 'habits'],
    readingTime: '3 min read',
    readingMinutes: 3,
    lastUpdated: 'July 14, 2026',
    timestamp: 1783939320000,
    status: 'Published'
  },
  {
    id: '4',
    title: 'Marketing Angle Brainstorming using LLM Prompts',
    category: 'Brainstorming',
    categoryKey: 'ideas',
    tags: ['creative', 'copywriting', 'growth'],
    readingTime: '7 min read',
    readingMinutes: 7,
    lastUpdated: 'July 10, 2026',
    timestamp: 1783593720000,
    status: 'Draft'
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // --- Real-time Local Filtering & Sorting Logic ---
  const filteredAndSortedFavorites = useMemo(() => {
    return favorites
      .filter((note) => {
        const matchesSearch = 
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = 
          categoryFilter === 'all' || note.categoryKey === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'time') {
          return b.readingMinutes - a.readingMinutes;
        }
        // default: 'recent'
        return b.timestamp - a.timestamp;
      });
  }, [favorites, searchQuery, categoryFilter, sortBy]);

  // Handle immediate deletion / unstar state change
  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  // Reset helper for empty state trigger button
  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setSortBy('recent');
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
            <h1 className="text-2xl font-semibold tracking-tight font-display">Favorites</h1>
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
            <RiSearchLine className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
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
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">▼</span>
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
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">▼</span>
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <RiListCheck className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <RiLayoutGridLine className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* STATISTICS ROW SECTION */}
      {favorites.length > 0 && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Total Favorites</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{favorites.length}</span>
              <span className="text-xs text-amber-500 font-medium">Starred</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Categories</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">
                {new Set(favorites.map(f => f.category)).size}
              </span>
              <span className="text-xs text-slate-400">sectors</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Matching Search</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-indigo-500">{filteredAndSortedFavorites.length}</span>
              <span className="text-xs text-slate-400">visible</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Total Tags</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">
                {favorites.reduce((acc, current) => acc + current.tags.length, 0)}
              </span>
              <span className="text-xs text-indigo-500 font-medium flex items-center gap-0.5">
                <RiSparkling2Line className="w-3 h-3" /> Index
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CORE FAVORITES PREMIUM TABLE */}
      {filteredAndSortedFavorites.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto ">
            <table className="w-full text-left border-collapse table-auto">
              <thead className="sticky top-0 bg-slate-50/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 z-10">
                <tr>
                  <th className="p-4 w-12 text-center">⭐</th>
                  <th className="p-4 min-w-[280px]">Title</th>
                  <th className="p-4 min-w-[140px]">Category</th>
                  <th className="p-4 min-w-[180px]">Tags</th>
                  <th className="p-4 min-w-[110px]">Reading Time</th>
                  <th className="p-4 min-w-[130px]">Last Updated</th>
                  <th className="p-4 min-w-[100px]">Status</th>
                  <th className="p-4 w-28 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm">
                {filteredAndSortedFavorites.map((note, index) => (
                  <tr 
                    key={note.id}
                    className={`group transition-colors duration-150 ${
                      index % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/20' : 'bg-transparent'
                    } hover:scale-101 hover:bg-zinc-400 dark:hover:bg-gray-800`}
                  >
                    {/* Star Toggle Action */}
                    <td className="p-4 text-center ">
                      <button 
                        onClick={() => handleRemoveFavorite(note.id)}
                        className="text-amber-400 hover:text-slate-300 dark:hover:text-slate-600 transition-colors transform hover:scale-110"
                        title="Remove Favorite"
                      >
                        <RiStarFill className="w-4 h-4 mx-auto" />
                      </button>
                    </td>

                    {/* Title */}
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                      <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer block truncate max-w-sm sm:max-w-md">
                        {note.title}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border ${
                        note.categoryKey === 'work' ? 'text-blue-600 bg-blue-50/50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-900/30' :
                        note.categoryKey === 'research' ? 'text-purple-600 bg-purple-50/50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/20 dark:border-purple-900/30' :
                        note.categoryKey === 'personal' ? 'text-teal-600 bg-teal-50/50 border-teal-100 dark:text-teal-400 dark:bg-teal-950/20 dark:border-teal-900/30' :
                        'text-amber-600 bg-amber-50/50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30'
                      }`}>
                        <RiFolderOpenLine className="w-3.5 h-3.5" />
                        {note.category}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {note.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="inline-flex items-center text-[11px] px-2 py-0.5 font-medium text-indigo-600 bg-indigo-50/60 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-md border border-indigo-100/40 dark:border-indigo-900/20"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Reading Time */}
                    <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <div className="flex items-center gap-1">
                        <RiTimeLine className="w-3.5 h-3.5 text-slate-400" />
                        <span>{note.readingTime}</span>
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="w-3.5 h-3.5 text-slate-400" />
                        <span>{note.lastUpdated}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full ${
                        note.status === 'Published' 
                          ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' 
                          : 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${note.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        {note.status}
                      </span>
                    </td>

                    {/* Row Item Level Target Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Open"
                        >
                          <RiBookOpenLine className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 text-slate-400 hover:text-purple-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <RiEditLine className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRemoveFavorite(note.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                          <RiMore2Fill className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        
        /* EMPTY STATE COMPONENT */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[420px] shadow-2xs">
          <div className="relative mb-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30 rounded-2xl text-amber-500 shadow-sm">
              <RiStarLine className="w-10 h-10 stroke-[0.5]" />
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight font-display mb-1">
            No favorite notes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6 leading-normal">
            {favorites.length > 0 
              ? "No items match your current search queries or category filters."
              : "Star your important notes so you can access them quickly."}
          </p>

          <button 
            type="button"
            onClick={favorites.length > 0 ? handleResetFilters : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/10 dark:shadow-indigo-950/20"
          >
            <RiCompass3Line className="w-4 h-4" />
            <span>{favorites.length > 0 ? "Clear Search Filters" : "Browse Notes"}</span>
          </button>
        </div>
      )}

    </div>
  );
}