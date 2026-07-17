import React, { useState, useMemo } from 'react';
import { 
  RiDeleteBin6Line,
  RiDeleteBin6Fill,
  RiSearchLine,
  RiFilter3Line,
  RiArrowUpDownLine,
  RiFolderOpenLine,
  RiTimeLine,
  RiCalendarLine,
  RiRestartLine,
  RiEyeLine,
  RiMore2Fill,
  RiAlertLine,
  RiArrowRightUpLine,
  RiInboxArchiveLine,
  RiHardDrive3Line,
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiSparkling2Line
} from 'react-icons/ri';

// Mock Trash structural dataset matching project state types
const INITIAL_TRASH = [
  {
    id: '1',
    title: 'Deprecated API Endpoint Architectures & Legacy Schemas',
    category: 'Research & Docs',
    categoryKey: 'research',
    tags: ['v1-cleanup', 'rest', 'json'],
    deletedDate: 'Yesterday, 4:15 PM',
    daysRemaining: 29,
    size: '142 KB',
    status: 'Archived',
    timestamp: 1784371320000
  },
  {
    id: '2',
    title: 'Raw Scratchpad: Initial Feedback on LLM Token Velocity',
    category: 'Brainstorming',
    categoryKey: 'ideas',
    tags: ['tokens', 'metrics'],
    deletedDate: 'July 15, 2026',
    daysRemaining: 27,
    size: '18 KB',
    status: 'Draft',
    timestamp: 1784025600000
  },
  {
    id: '3',
    title: 'Old Q1 Goals & Product KPI Evaluation Sheets',
    category: 'Work & Projects',
    categoryKey: 'work',
    tags: ['kpi', 'q1-legacy'],
    deletedDate: 'July 11, 2026',
    daysRemaining: 23,
    size: '84 KB',
    status: 'Published',
    timestamp: 1783680000000
  },
  {
    id: '4',
    title: 'Gym Workout Routines & Supplement Optimization Log',
    category: 'Personal Log',
    categoryKey: 'personal',
    tags: ['fitness', 'health'],
    deletedDate: 'June 28, 2026',
    daysRemaining: 10,
    size: '32 KB',
    status: 'Draft',
    timestamp: 1782556800000
  }
];

export default function TrashPage() {
  const [trashItems, setTrashItems] = useState(INITIAL_TRASH);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // UI-only multi-select trackers
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // --- Real-Time Client Side Filtering & Sorting Architecture ---
  const filteredAndSortedTrash = useMemo(() => {
    return trashItems
      .filter((item) => {
        const matchesSearch = 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCategory = 
          categoryFilter === 'all' || item.categoryKey === categoryFilter;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'days') return a.daysRemaining - b.daysRemaining;
        return b.timestamp - a.timestamp; // Recent deleted default
      });
  }, [trashItems, searchQuery, categoryFilter, sortBy]);

  // UI Selection Mechanics (Simulated states without altering business logic)
  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedTrash.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedTrash.map(item => item.id));
    }
  };

  // Pure state actions for client interactivity responsiveness
  const handleRestoreItem = (id: string) => {
    setTrashItems(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-slate-600 to-slate-800 text-white shadow-sm dark:from-slate-700 dark:to-slate-900">
              <RiDeleteBin6Line className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight font-display">Trash</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recently deleted notes are stored here before permanent deletion.
          </p>
        </div>

        {/* Filters and Inputs Controls Wrapper */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Real-time Filter Query Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <input 
              type="text"
              placeholder="Search deleted notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <RiSearchLine className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="relative flex items-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Sectors</option>
              <option value="work">Work & Projects</option>
              <option value="research">Research & Docs</option>
              <option value="personal">Personal Log</option>
              <option value="ideas">Brainstorming</option>
            </select>
            <RiFolderOpenLine className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">▼</span>
          </div>

          {/* Sort Strategy */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="recent">Recently Deleted</option>
              <option value="title">Alphabetical</option>
              <option value="days">Time Remaining</option>
            </select>
            <RiArrowUpDownLine className="absolute left-3 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
            <span className="absolute right-2.5 text-slate-400 text-[9px] pointer-events-none">▼</span>
          </div>
        </div>
      </header>

      {/* 30 DAYS WARNING BANNER */}
      <div className="mb-6 p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300">
          <RiAlertLine className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="font-medium">Notes in Trash are permanently deleted after 30 days.</span>
        </div>
        <button 
          type="button"
          className="text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5 font-medium whitespace-nowrap"
        >
          <span>Learn More</span>
          <RiArrowRightUpLine className="w-3 h-3" />
        </button>
      </div>

      {/* STATISTICS ROW */}
      {trashItems.length > 0 && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Deleted Notes</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display">{trashItems.length}</span>
              <span className="text-xs text-slate-400">items</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Deleted Today</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-slate-700 dark:text-slate-300">1</span>
              <span className="text-xs text-red-500 font-medium">pending cycle</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Days Until Auto Delete</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-amber-500">30</span>
              <span className="text-xs text-slate-400">days max</span>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block mb-1">Storage Used</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-indigo-500">276</span>
              <span className="text-xs text-slate-400 font-mono">KB recoverable</span>
            </div>
          </div>
        </section>
      )}

      {/* BULK ACTION CONTEXT BAR */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl flex items-center justify-between gap-4 animate-fade-in text-xs transition-all">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <span className="font-medium text-indigo-900 dark:text-indigo-300">
              {selectedIds.length} {selectedIds.length === 1 ? 'note' : 'notes'} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTrashItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 font-medium text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors inline-flex items-center gap-1"
            >
              <RiRestartLine className="w-3.5 h-3.5" />
              <span>Restore Selected</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTrashItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
                setSelectedIds([]);
              }}
              className="px-3 py-1.5 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors inline-flex items-center gap-1 shadow-2xs"
            >
              <RiDeleteBin6Line className="w-3.5 h-3.5" />
              <span>Delete Forever</span>
            </button>
            <span className="h-4 w-px bg-indigo-200 dark:bg-indigo-900 mx-1"></span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium px-2 py-1.5"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* TRASH DISCOVERY DATA GRID TABLE */}
      {filteredAndSortedTrash.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse table-auto">
              {/* Sticky Frame Header */}
              <thead className="sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 z-10">
                <tr>
                  <th className="p-4 w-12 text-center">
                    <button 
                      type="button"
                      onClick={toggleSelectAll} 
                      className="text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      {selectedIds.length === filteredAndSortedTrash.length ? (
                        <RiCheckboxFill className="w-4 h-4 text-indigo-500" />
                      ) : (
                        <RiCheckboxBlankLine className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 min-w-[260px]">Title</th>
                  <th className="p-4 min-w-[130px]">Category</th>
                  <th className="p-4 min-w-[160px]">Tags</th>
                  <th className="p-4 min-w-[140px]">Deleted Date</th>
                  <th className="p-4 min-w-[130px]">Days Remaining</th>
                  <th className="p-4 min-w-[90px]">Size</th>
                  <th className="p-4 min-w-[100px]">Status</th>
                  <th className="p-4 w-28 text-right">Actions</th>
                </tr>
              </thead>

              {/* Data Node Rows */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-sm">
                {filteredAndSortedTrash.map((item, index) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr 
                      key={item.id}
                      className={`group transition-all duration-150 ${
                        isChecked ? 'bg-indigo-50/20 dark:bg-indigo-950/10' :
                        index % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : 'bg-transparent'
                     } hover:scale-101 hover:bg-zinc-400 dark:hover:bg-gray-800`}
                    >
                      {/* Selection Node Box */}
                      <td className="p-4 text-center">
                        <button 
                          type="button"
                          onClick={() => toggleSelectRow(item.id)} 
                          className="text-slate-400 hover:text-indigo-500 transition-colors"
                        >
                          {isChecked ? (
                            <RiCheckboxFill className="w-4 h-4 text-indigo-500" />
                          ) : (
                            <RiCheckboxBlankLine className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Document Title */}
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                        <span className="block truncate max-w-xs sm:max-w-sm text-slate-700 dark:text-slate-300">
                          {item.title}
                        </span>
                      </td>

                      {/* Component Sector Badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-lg border ${
                          item.categoryKey === 'work' ? 'text-blue-600 bg-blue-50/50 border-blue-100 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-900/30' :
                          item.categoryKey === 'research' ? 'text-purple-600 bg-purple-50/50 border-purple-100 dark:text-purple-400 dark:bg-purple-950/20 dark:border-purple-900/30' :
                          item.categoryKey === 'personal' ? 'text-teal-600 bg-teal-50/50 border-teal-100 dark:text-teal-400 dark:bg-teal-950/20 dark:border-teal-900/30' :
                          'text-amber-600 bg-amber-50/50 border-amber-100 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/30'
                        }`}>
                          {item.category}
                        </span>
                      </td>

                      {/* Tag Chips Array display map */}
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx}
                              className="inline-flex items-center text-[11px] px-2 py-0.5 font-medium text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Metadata Deleted Timeline */}
                      <td className="p-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <RiCalendarLine className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.deletedDate}</span>
                        </div>
                      </td>

                      {/* Countdown Metrics Indicator */}
                      <td className="p-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full ${item.daysRemaining < 15 ? 'bg-red-500' : 'bg-amber-500'}`} 
                              style={{ width: `${(item.daysRemaining / 30) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`font-medium ${item.daysRemaining < 15 ? 'text-red-500 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                            {item.daysRemaining} days left
                          </span>
                        </div>
                      </td>

                      {/* Memory Footprint Footnote */}
                      <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {item.size}
                      </td>

                      {/* Status Badging */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full ${
                          item.status === 'Published' 
                            ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20' 
                            : 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Alignment Context Action Blocks */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button 
                            type="button"
                            onClick={() => handleRestoreItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Restore"
                          >
                            <RiRestartLine className="w-4 h-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleRestoreItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <RiEyeLine className="w-4 h-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleRestoreItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete Forever"
                          >
                            <RiDeleteBin6Line className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                            <RiMore2Fill className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        
        /* PREMIUM SUBSURFACE EMPTY STATE VIEW COMPONENT */
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[400px] shadow-2xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl text-slate-400 mb-4 shadow-2xs">
            <RiInboxArchiveLine className="w-10 h-10 stroke-[0.5]" />
          </div>

          <h3 className="text-lg font-semibold tracking-tight font-display mb-1">
            Trash is empty
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6 leading-normal">
            {trashItems.length > 0 
              ? "No files found matching the criteria queries applied."
              : "Deleted notes will appear here until they are permanently removed."}
          </p>

          <button 
            type="button"
            onClick={trashItems.length > 0 ? () => { setSearchQuery(''); setCategoryFilter('all'); } : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/10 dark:shadow-indigo-950/20"
          >
            <RiSparkling2Line className="w-4 h-4" />
            <span>{trashItems.length > 0 ? "Clear Filter Configurations" : "Go to My Notes"}</span>
          </button>
        </div>
      )}

    </div>
  );
}