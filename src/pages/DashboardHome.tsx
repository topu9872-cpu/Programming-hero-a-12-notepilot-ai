import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { 
  RiSparkling2Line,
  RiFileList3Line,
  RiTimeLine,
  RiHeartLine,
  RiHeartFill,
  RiEyeLine,
  RiMore2Fill,
  RiBookOpenLine,
  RiTranslate2,
  RiLightbulbLine,
  RiFontColor,
  RiRidingLine,
  RiPulseLine
} from 'react-icons/ri';

// Premium Mock Data Structures for Note Tracking
const MOCK_RECENT_NOTES = [
  {
    id: 'note-1',
    title: 'Russian Grammar Systems & Verb Conjugation Matrices',
    folder: 'Language Study',
    tags: ['russian', 'grammar', 'verbs'],
    updatedAt: '14 mins ago',
    words: '1,240 words',
    favorite: true
  },
  {
    id: 'note-2',
    title: 'MERN Stack Architecture & Better-Auth Middleware Flow',
    folder: 'Computer Science',
    tags: ['nextjs', 'mongodb', 'auth'],
    updatedAt: '2 hours ago',
    words: '3,450 words',
    favorite: false
  },
  {
    id: 'note-3',
    title: 'UI Styling System: Tailwind CSS & DaisyUI Tokens',
    folder: 'UI/UX Design',
    tags: ['tailwind', 'figma', 'design'],
    updatedAt: 'Yesterday',
    words: '890 words',
    favorite: true
  }
];

// Graph Metric Streams
const KNOWLEDGE_VELOCITY_DATA = [
  { day: 'Mon', words: 1200, aiQueries: 4 },
  { day: 'Tue', words: 2800, aiQueries: 12 },
  { day: 'Wed', words: 1900, aiQueries: 7 },
  { day: 'Thu', words: 4200, aiQueries: 19 },
  { day: 'Fri', words: 3100, aiQueries: 14 },
  { day: 'Sat', words: 5580, aiQueries: 26 },
  { day: 'Sun', words: 2400, aiQueries: 9 },
];

export default function DashboardHomePage() {
  const [notes, setNotes] = useState(MOCK_RECENT_NOTES);
  const [activeKpiIndex, setActiveKpiIndex] = useState(0);

  const toggleFavorite = (id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20">
      
      {/* 1. PREMIUM WELCOME HEADER */}
      <header className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 mb-8 shadow-xs overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-4 right-4 text-slate-200/30 dark:text-slate-800/50 pointer-events-none">
          <RiSparkling2Line className="w-24 h-24 stroke-[0.5]" />
        </div>

        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold font-mono text-indigo-600 bg-indigo-50/60 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-md border border-indigo-100/30 dark:border-indigo-900/30">
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span> NotePilot AI Live Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent font-display">
            Your Knowledge Engine is synchronized
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Welcome back. Review your real-time generation metrics, structural writing data arrays, and contextual updates below.
          </p>
        </div>
      </header>

      {/* 2. WRITING INSIGHTS & INTERACTIVE KPI GRAPHS PANEL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* KPI Sparkline Graph: Word Volume */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">Weekly Volume</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold font-display">5,580</span>
                <span className="text-[10px] text-emerald-500 font-mono font-medium inline-flex items-center gap-0.5">
                  <RiRidingLine /> +18%
                </span>
              </div>
            </div>
            <div className="p-2 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-xl text-indigo-500">
              <RiPulseLine className="w-4 h-4" />
            </div>
          </div>
          
          {/* Recharts Mini Area Chart */}
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={KNOWLEDGE_VELOCITY_DATA} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="words" stroke="#6366f1" strokeWidth={1.5} fillOpacity={1} fill="url(#colorWords)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI Sparkline Graph: AI Knowledge Density */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">AI Syntheses Array</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold font-display text-purple-500">91</span>
                <span className="text-xs text-slate-400 font-mono">queries compiled</span>
              </div>
            </div>
            <div className="p-2 bg-purple-500/5 dark:bg-purple-500/10 rounded-xl text-purple-500">
              <RiSparkling2Line className="w-4 h-4" />
            </div>
          </div>

          {/* Recharts Mini Bar Chart */}
<div className="h-16 w-full text-slate-900 dark:text-slate-100">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={KNOWLEDGE_VELOCITY_DATA}>
      <Tooltip 
        contentStyle={{ display: 'none' }} /* We use a generic HTML tool tip or pure Tailwind custom component if absolute control is needed, but for native tooltip style matching dark/light: */
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-md text-[10px] font-mono shadow-xs text-slate-900 dark:text-slate-100">
                {payload[0].value} queries
              </div>
            );
          }
          return null;
        }}
      />
      <Bar dataKey="aiQueries" radius={[3, 3, 0, 0]}>
        {KNOWLEDGE_VELOCITY_DATA.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            /* Uses CSS custom properties that match your Tailwind colors, or defaults gracefully */
            className={`${
              index === 5 
                ? 'fill-purple-600 dark:fill-purple-400 opacity-90' 
                : 'fill-purple-400/60 dark:fill-purple-500/40'
            }`} 
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
        </div>

        {/* Full Interactive Core Analytics Panel Row */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">System Sync Health</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium font-mono text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Operational
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-850 pb-1.5">
              <span className="text-slate-500">Active Folders</span>
              <span className="font-semibold font-mono">12 Spaces</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Cloud Integrity</span>
              <span className="font-semibold font-mono text-indigo-500">100% Verified</span>
            </div>
          </div>
        </div>

      </section>

      {/* 3. CORE ANALYTICS GRAPH & RECENT NOTES GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COMPONENT COLUMN (Table + Strategy Map) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* MAIN DATA ANALYTICS GRAPH: VELOCITY INDEX */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Knowledge Velocity Index</h3>
                <p className="text-[11px] text-slate-400">Word integration telemetry mapped across current node clusters.</p>
              </div>
            </div>

            <div className="h-48 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={KNOWLEDGE_VELOCITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                  <Area type="monotone" dataKey="words" stroke="#6366f1" strokeWidth={2} fill="url(#colorWords)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RECENT NOTES INTERACTIVE TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-2">
                <RiFileList3Line className="w-4 h-4 text-indigo-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Recent Notes</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-850 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Folder</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4">Modified</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
                  {notes.map((note) => (
                    <tr key={note.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/40 group transition-colors">
                      
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                        <div className="flex items-center gap-2.5 max-w-xs sm:max-w-sm">
                          <button 
                            onClick={() => toggleFavorite(note.id)}
                            className={`transition-colors p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 ${note.favorite ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                          >
                            {note.favorite ? <RiHeartFill className="w-3.5 h-3.5" /> : <RiHeartLine className="w-3.5 h-3.5" />}
                          </button>
                          <span className="truncate block cursor-pointer group-hover:text-indigo-500 transition-colors">{note.title}</span>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-400 font-medium">
                        {note.folder}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-1.5">
                          {note.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-slate-400 dark:text-slate-500">
                        <div className="space-y-0.5">
                          <p className="text-slate-600 dark:text-slate-400 font-medium">{note.updatedAt}</p>
                          <p className="text-[10px] font-mono">{note.words}</p>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button type="button" className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded">
                            <RiEyeLine className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded">
                            <RiMore2Fill className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRODUCTIVITY TIP CARD */}
          <div className="bg-gradient-to-r from-amber-500/5 via-transparent to-transparent p-5 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 flex gap-4 items-start bg-white dark:bg-slate-900">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
              <RiLightbulbLine className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Productivity Strategy</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Break down your structural Russian vocabulary modules using nested lists in the text layers. NotePilot AI tracks formatting depth to auto-compile targeted linguistic cards directly.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI Context Clusters & Event Logs */}
        <div className="space-y-6">
          
          {/* AI SUGGESTIONS CONTEXT PANEL */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <RiSparkling2Line className="w-4 h-4 text-indigo-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">AI Suggestions</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-purple-500 flex items-center gap-1 uppercase"><RiTranslate2 /> Language Grid</span>
                  <span className="text-slate-400 font-mono">Suggested</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-normal">
                  Generate structural practice templates for imperfective vs perfective Russian verb aspects.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-indigo-500 flex items-center gap-1 uppercase"><RiBookOpenLine /> Code Context</span>
                  <span className="text-slate-400 font-mono">Optimization</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-normal">
                  Abstract Better-Auth tokens into layout layouts for extreme state-rehydration processing speed.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-semibold text-teal-500 flex items-center gap-1 uppercase"><RiFontColor /> Interface System</span>
                  <span className="text-slate-400 font-mono">Theme Config</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-normal">
                  Link DaisyUI functional color structures cleanly to match your standard active CSS configurations.
                </p>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY TIMELINE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <RiTimeLine className="w-4 h-4 text-slate-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Activity Timeline</h3>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-y-1 before:left-1.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-850">
              
              <div className="relative pl-5 text-xs">
                <span className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Edited Language Note</p>
                <p className="text-[10px] text-slate-400 font-mono">14 mins ago • 'Russian Grammar'</p>
              </div>

              <div className="relative pl-5 text-xs">
                <span className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Ran AI Summary Engine</p>
                <p className="text-[10px] text-slate-400 font-mono">2 hours ago • Formatted Auth Code</p>
              </div>

              <div className="relative pl-5 text-xs">
                <span className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Bookmarked Design Specs</p>
                <p className="text-[10px] text-slate-400 font-mono">Yesterday • DaisyUI Tokens</p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}