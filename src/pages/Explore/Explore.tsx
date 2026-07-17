import React, { useState, useMemo } from 'react';
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
  Briefcase
} from 'lucide-react';

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface Note {
  id: string;
  title: string;
  description: string;
  category: string;
  coverIcon: React.ReactNode;
  coverGradient: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
  isTrending?: boolean;
}

interface Creator {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  category: string;
}

interface CategoryItem {
  name: string;
  icon: React.ReactNode;
  count: number;
  gradient: string;
}

// ==========================================
// MOCK DATA
// ==========================================
const MOCK_CATEGORIES: CategoryItem[] = [
  { name: 'AI', icon: <Cpu className="w-3.5 h-3.5" />, count: 142, gradient: 'from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  { name: 'Programming', icon: <Terminal className="w-3.5 h-3.5" />, count: 98, gradient: 'from-blue-500/10 to-sky-500/10 text-blue-600 dark:text-sky-400 border-blue-500/20' },
  { name: 'React', icon: <Layers className="w-3.5 h-3.5" />, count: 64, gradient: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
  { name: 'TypeScript', icon: <Code className="w-3.5 h-3.5" />, count: 47, gradient: 'from-indigo-600/10 to-blue-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-600/20' },
  { name: 'JavaScript', icon: <Code className="w-3.5 h-3.5" />, count: 83, gradient: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20' },
  { name: 'Productivity', icon: <Zap className="w-3.5 h-3.5" />, count: 112, gradient: 'from-rose-500/10 to-orange-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
  { name: 'Design', icon: <Palette className="w-3.5 h-3.5" />, count: 56, gradient: 'from-pink-500/10 to-violet-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
  { name: 'Career', icon: <Briefcase className="w-3.5 h-3.5" />, count: 39, gradient: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
];

const MOCK_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'The Architecture of Modern Large Language Models',
    description: 'An in-depth breakdown of transformer blocks, attention mechanisms, and context window optimization tricks.',
    category: 'AI',
    coverIcon: <Cpu className="w-5 h-5 text-purple-500" />,
    coverGradient: 'from-purple-600 to-indigo-600',
    author: {
      name: 'Dr. Alex Rivers',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isVerified: true
    },
    readTime: '8 min',
    views: 3420,
    likes: 892,
    tags: ['LLM', 'AI'],
    isTrending: true
  },
  {
    id: 'note-2',
    title: 'Advanced React 19 Compiler & Server Actions Patterns',
    description: 'Master automated memoization rules, elegant form actions status updates, and hybrid rendering structures.',
    category: 'React',
    coverIcon: <Layers className="w-5 h-5 text-cyan-500" />,
    coverGradient: 'from-cyan-500 to-blue-600',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      isVerified: true
    },
    readTime: '12 min',
    views: 5120,
    likes: 1240,
    tags: ['React19', 'UX'],
    isTrending: true
  },
  {
    id: 'note-3',
    title: 'TypeScript Type Gymnastics for Strict API Validators',
    description: 'How to use template literal types, conditional type mappings, and infer keywords to create dynamic routes.',
    category: 'TypeScript',
    coverIcon: <Code className="w-5 h-5 text-blue-500" />,
    coverGradient: 'from-blue-600 to-cyan-500',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '6 min',
    views: 2150,
    likes: 530,
    tags: ['TS', 'Backend']
  },
  {
    id: 'note-4',
    title: 'Building a Fast Custom Second-Brain Vector DB Engine',
    description: 'Step-by-step notes on orchestrating semantic retrieval systems using local embeddings and minimal memory.',
    category: 'Productivity',
    coverIcon: <Zap className="w-5 h-5 text-rose-500" />,
    coverGradient: 'from-rose-500 to-amber-600',
    author: {
      name: 'Marc Veras',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      isVerified: true
    },
    readTime: '10 min',
    views: 4890,
    likes: 912,
    tags: ['AI', 'Productivity'],
    isTrending: true
  },
  {
    id: 'note-5',
    title: 'Clean Architecture Principles for Node.js Microservices',
    description: 'Isolating domain business logic from framework dependencies. Practical diagrams on core models.',
    category: 'Programming',
    coverIcon: <Terminal className="w-5 h-5 text-emerald-500" />,
    coverGradient: 'from-emerald-600 to-teal-600',
    author: {
      name: 'Nikolai Volkov',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '7 min',
    views: 1840,
    likes: 412,
    tags: ['Node', 'CleanCode']
  },
  {
    id: 'note-6',
    title: 'Designing Ultra-High Contrast Interfaces for SaaS',
    description: 'A friendly study on maximizing text readability, dark mode scaling considerations, and design flow.',
    category: 'Design',
    coverIcon: <Palette className="w-5 h-5 text-pink-500" />,
    coverGradient: 'from-pink-500 to-purple-600',
    author: {
      name: 'Anya Taylor',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    readTime: '5 min',
    views: 2930,
    likes: 760,
    tags: ['UIUX', 'Figma']
  },
  {
    id: 'note-7',
    title: 'Understanding JavaScript Event Loop and V8 Microtasks',
    description: 'Stop guessing async sequence outcomes. Visualizing execution context stacks and render triggers.',
    category: 'JavaScript',
    coverIcon: <Code className="w-5 h-5 text-amber-500" />,
    coverGradient: 'from-amber-500 to-yellow-600',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      isVerified: true
    },
    readTime: '9 min',
    views: 3110,
    likes: 680,
    tags: ['JS', 'V8']
  },
  {
    id: 'note-8',
    title: 'Cracking the Senior Staff Engineer Interview Blueprint',
    description: 'System design roadmaps, soft skill expectation frameworks, and how to project true architectural leadership.',
    category: 'Career',
    coverIcon: <Briefcase className="w-5 h-5 text-sky-500" />,
    coverGradient: 'from-indigo-500 to-blue-700',
    author: {
      name: 'Marc Veras',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      isVerified: true
    },
    readTime: '15 min',
    views: 6200,
    likes: 1980,
    tags: ['Career', 'Interview']
  }
];

const MOCK_CREATORS: Creator[] = [
  {
    id: 'c-1',
    name: 'Sarah Chen',
    bio: 'Core Frontend Specialist. Crafting joyful, fluid React interfaces.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    followers: 12400,
    category: 'React'
  },
  {
    id: 'c-2',
    name: 'Dr. Alex Rivers',
    bio: 'AI Explorer. Simplifying complex deep learning models into visual nuggets.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    followers: 9800,
    category: 'AI'
  },
  {
    id: 'c-3',
    name: 'Marc Veras',
    bio: 'Productivity coach mapping modern clean workspaces and workflows.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    followers: 15600,
    category: 'Productivity'
  },
  {
    id: 'c-4',
    name: 'Elena Rostova',
    bio: 'Fullstack developer sharing elegant, robust TypeScript design patterns.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    followers: 7300,
    category: 'TypeScript'
  },
  {
    id: 'c-5',
    name: 'Nikolai Volkov',
    bio: 'Backend architect specialized in lightning fast microservices structural flow.',
    avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&q=80',
    followers: 5900,
    category: 'Programming'
  }
];

export default function Explore() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ==========================================
  // HANDLERS
  // ==========================================
  const toggleFollow = (creatorId: string) => {
    setFollowedCreators((prev) => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId) 
        : [...prev, creatorId]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  // ==========================================
  // MEMOIZED FILTER LOGIC
  // ==========================================
  const filteredNotes = useMemo(() => {
    return MOCK_NOTES.filter((note) => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory ? note.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
            <span className="text-slate-600 dark:text-zinc-300">Welcome to NotePilot Note Hub</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 leading-tight">
            Explore <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">Public Notes</span> ✨
          </h1>
          
          <p className="text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Discover beautifully curated technical ideas, friendly roadmaps, and micro-summaries built directly inside our active AI workspaces.
          </p>

          {/* SEARCH COMPONENT */}
          <div className="relative max-w-lg mx-auto mt-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-2xl opacity-10 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 focus-within:border-indigo-400 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/5">
              <Search className="w-4.5 h-4.5 ml-4 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Find topics, tags, or creator insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-3.5 bg-transparent outline-none text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold mr-3 px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:bg-slate-200 transition-colors duration-200"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${
                selectedCategory === null
                  ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102'
                  : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'
              }`}
            >
              All Logs
            </button>
            {MOCK_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 scale-102'
                      : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'
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
              Browse streamlined, dense structural content files shared by the network
            </p>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-zinc-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800/80 backdrop-blur-sm">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-zinc-700 mb-2" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300">No notes fit criteria</h3>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
                Try modifying your terms or clear the current active category chip.
              </p>
            </div>
          ) : (
            /* DENSE 4-COLUMN RESPONSIVE LAYOUT */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="flex flex-col justify-between p-4.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 dark:hover:border-zinc-700 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    {/* ACCENT ROW */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 transition-colors duration-200">
                        {note.coverIcon}
                      </div>
                      <div className="flex items-center gap-1.5">
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
                      {note.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold text-indigo-500/80 dark:text-zinc-500 bg-indigo-50/40 dark:bg-transparent px-1 rounded">
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
                          src={note.author.avatar} 
                          alt={note.author.name}
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800"
                        />
                        <div className="leading-tight">
                          <p className="text-[11px] font-bold flex items-center gap-0.5 text-slate-800 dark:text-zinc-200">
                            <span className="truncate max-w-[70px]">{note.author.name.split(' ')[0]}</span>
                            {note.author.isVerified && <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 fill-blue-500 dark:fill-none" />}
                          </p>
                          <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-medium">
                            {note.readTime}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 text-[10px] font-bold">
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" /> {note.views >= 1000 ? `${(note.views/1000).toFixed(0)}k` : note.views}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <ThumbsUp className="w-3 h-3" /> {note.likes}
                        </span>
                      </div>
                    </div>

                    <button className="w-full inline-flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-500 hover:bg-indigo-600 dark:bg-zinc-850 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-zinc-300 dark:hover:text-white text-[11px] font-bold transition-all duration-200 group/btn shadow-inner">
                      <span>Read Document</span>
                      <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ==========================================
            3. TRENDING CATEGORIES
           ========================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span>Explore Architecture Hubs</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Jump directly into specific high-density public note segments
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {MOCK_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group flex items-center justify-between p-3 rounded-xl border bg-white dark:bg-zinc-900 cursor-pointer shadow-sm transition-all duration-200 ${
                  selectedCategory === cat.name 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/10 bg-indigo-50/10' 
                    : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg border bg-gradient-to-br ${cat.gradient.split(' ')[0]} ${cat.gradient.split(' ')[1]} group-hover:scale-105 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                      {cat.count} documents
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. POPULAR CREATORS
           ========================================== */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" />
              <span>Verified System Designers</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Follow trusted engineering professionals mapping domain knowledge maps publically
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {MOCK_CREATORS.map((creator) => {
              const isFollowing = followedCreators.includes(creator.id);
              return (
                <div
                  key={creator.id}
                  className="flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm transition-all duration-200 text-center hover:border-indigo-100"
                >
                  <div className="space-y-2.5">
                    <div className="relative inline-block mx-auto">
                      <img 
                        src={creator.avatar} 
                        alt={creator.name}
                        className="w-12 h-12 rounded-full mx-auto object-cover border-2 border-slate-50 dark:border-zinc-800"
                      />
                      <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-indigo-600 text-white font-extrabold text-[7px] rounded-md tracking-wider">
                        {creator.category}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100 truncate">
                        {creator.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {creator.followers >= 1000 ? `${(creator.followers/1000).toFixed(1)}k` : creator.followers} followers
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                      {creator.bio}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-zinc-800">
                    <button
                      onClick={() => toggleFollow(creator.id)}
                      className={`w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all duration-150 ${
                        isFollowing
                          ? 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                          : 'bg-slate-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:opacity-90 active:scale-98'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-3 h-3" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            5. NEWSLETTER CTA (FRIENDLY SOFT DESIGN)
           ========================================== */}
        <section className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-rose-500/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto px-5 py-10 text-center space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-zinc-800 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-100 dark:border-zinc-700">
              <Mail className="w-4.5 h-4.5" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-extrabold tracking-tight">
                Stay Ahead of the Learning Curve 🚀
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 font-normal max-w-md mx-auto">
                Join our friendly digest to receive direct system logs, MERN structural updates, and clean documentation files curated by NotePilot AI.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 max-w-sm mx-auto pt-1">
              <input
                type="email"
                required
                placeholder="Enter your favorite engineering email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:border-indigo-400 shadow-sm text-center sm:text-left"
              />
              <button
                type="submit"
                className="w-full sm:w-auto text-nowrap px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide transition-all active:scale-98"
              >
                Join Feed
              </button>
            </form>

            {isSubscribed && (
              <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide animate-pulse">
                Awesome! You are officially in the documentation transmission queue.
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}