import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  ChevronDown, 
  Grid, 
  List, 
  MoreVertical, 
  Star, 
  Plus 
} from 'lucide-react';

const MyNotes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Latest');
  const [view, setView] = useState('grid');
  
  // Real apps use state for dynamic mutations like toggling favorites
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Note 1',
      content: 'This is the content of note 1.',
      category: 'Category 1',
      tags: ['tag1', 'tag2'],
      date: '2024-09-16',
      favorite: false,
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'This is the content of note 2.',
      category: 'Category 2',
      tags: ['tag3', 'tag4'],
      date: '2024-09-15',
      favorite: true,
    },
    {
      id: 3,
      title: 'Note 3',
      content: 'This is the content of note 3.',
      category: 'Category 3',
      tags: ['tag5', 'tag6'],
      date: '2024-09-14',
      favorite: false,
    },
  ]);

  // Toggle favorite state handler
  const toggleFavorite = (id:Number) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) => {
    const titleMatches = note.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = category === 'All' || note.category === category;
    return titleMatches && categoryMatches;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sort === 'Latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sort === 'Oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto transition-colors duration-200">
      {/* Header Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Notes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Your personal notes, powered by NotePilot AI.</p>
        </div>
        <button 
          onClick={() => navigate('/create-note')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-95 text-white font-medium py-2.5 px-4 rounded-xl shadow transition w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Create Note
        </button>
      </div>

      {/* Unified Search & Actions Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors">
        {/* Search Input Box */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Filters and Layout Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Category Selector */}
          <div className="relative min-w-[140px] w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/60 pl-3 pr-10 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            >
              <option value="All">All Categories</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative min-w-[130px] w-full sm:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/60 pl-3 pr-10 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Alphabetical">Alphabetical</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" />
          </div>

          {/* View Toggler Button */}
          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition w-full sm:w-auto flex justify-center items-center"
            title={view === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
          >
            {view === 'grid' ? <List size={18} /> : <Grid size={18} />}
          </button>
        </div>
      </div>

      {/* Main Content Layout Container */}
      {sortedNotes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors">
          <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={40} />
          <p className="text-slate-500 dark:text-slate-400 font-medium">No notes match your filter setup.</p>
        </div>
      ) : (
        <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {sortedNotes.map((note) => (
            <div 
              key={note.id} 
              className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md dark:hover:border-slate-700/80 transition duration-200 flex flex-col justify-between ${
                view === 'list' ? 'md:flex-row md:items-center gap-4' : 'h-64'
              }`}
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{note.title}</h3>
                    <span className="inline-block shrink-0 px-2.5 py-0.5 text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full">
                      {note.category}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 shrink-0 p-0.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Row info / Right Column Info in List View */}
              <div className={`flex items-center justify-between border-t border-slate-50 dark:border-slate-800/60 pt-3 mt-2 shrink-0 ${
                view === 'list' ? 'md:border-t-0 md:pt-0 md:mt-0 md:flex-col md:items-end md:justify-center md:gap-2 md:min-w-[120px]' : ''
              }`}>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{note.date}</span>
                <button 
                  onClick={() => toggleFavorite(note.id)}
                  className="focus:outline-none p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <Star 
                    size={18} 
                    className={note.favorite ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500"} 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNotes;