import React, { useState } from 'react';
import { 
  RiSparkling2Line,
  RiUser3Line,
  RiShieldFlashLine,
  RiSettings3Line,
  RiMapPin2Line,
  RiGlobalLine,
  RiBriefcaseLine,
  RiBuilding4Line,
  RiSmartphoneLine,
  RiMacbookLine,
  RiLockPasswordLine,
  RiMedal2Line,
  RiPieChart2Line,
  RiTimeLine,
  RiGoogleFill,
  RiGithubFill,
  RiMicrosoftFill,
  RiDiscordFill,
  RiErrorWarningLine,
  RiDownloadCloud2Line,
  RiShutDownLine,
  RiEditLine,
  RiShareForwardLine,
  RiFileList3Line,
  RiStarFill,
  RiSave3Line,
  RiCheckboxCircleLine
} from 'react-icons/ri';

export default function ProfilePage() {
  // --- UI-only Active Toggle States (No logic modification) ---
  const [activeTheme, setActiveTheme] = useState('dark');
  const [autoSave, setAutoSave] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20">
      
      {/* 1. PREMIUM HEADER FRAME */}
      <header className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 mb-8 shadow-xs overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Block with Ambient Glowing Status Ring */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80" 
                alt="Profile Avatar" 
                className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-slate-900"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white border-2 border-white dark:border-slate-900 font-bold" title="Online Status">
                ●
              </span>
            </div>

            {/* Profile Core Title metadata */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight font-display bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Elena Rostova
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold font-mono text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-md border border-indigo-100/50 dark:border-indigo-900/30">
                  <RiSparkling2Line className="w-3 h-3 animate-pulse" /> Gemini Enterprise
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Principal AI Interaction Architect</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">elena.rostova@notepilot.ai</p>
            </div>
          </div>

          {/* Action Management Buttons */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all shadow-2xs dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-850">
              <RiShareForwardLine className="w-4 h-4" /> Share Profile
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/10">
              <RiEditLine className="w-4 h-4" /> Edit Configuration
            </button>
          </div>
        </div>
      </header>

      {/* 2. PROFILE TELEMETRY / OVERVIEW CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs hover:border-indigo-500/30 transition-all group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Total Notes</span>
            <RiFileList3Line className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div className="text-2xl font-bold font-display">1,482</div>
          <span className="text-[10px] text-emerald-500 font-mono font-medium">+34 this week</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs hover:border-amber-500/30 transition-all group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Favorite Notes</span>
            <RiStarFill className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
          </div>
          <div className="text-2xl font-bold font-display">194</div>
          <span className="text-[10px] text-slate-400 font-mono">13.1% conversion rate</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs hover:border-purple-500/30 transition-all group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">AI Generations</span>
            <RiSparkling2Line className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" />
          </div>
          <div className="text-2xl font-bold font-display">8,319</div>
          <span className="text-[10px] text-purple-500 font-mono font-medium">99.8% prompt efficacy</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xs hover:border-teal-500/30 transition-all group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Account Age</span>
            <RiTimeLine className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
          </div>
          <div className="text-2xl font-bold font-display">524</div>
          <span className="text-[10px] text-slate-400 font-mono">Days since initialization</span>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        
        {/* LEFT COLUMN: Data Config Sheets (70%) */}
        <main className="lg:col-span-7 space-y-6">
          
          {/* A. PERSONAL INFORMATION CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <RiUser3Line className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500">Full Name</label>
                <input type="text" defaultValue="Elena Rostova" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500">Username</label>
                <input type="text" defaultValue="@elena_ai" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500">Email Address</label>
                <input type="email" defaultValue="elena.rostova@notepilot.ai" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500">Phone</label>
                <input type="text" defaultValue="+1 (555) 234-8910" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 dark:text-slate-500">Bio / Professional Statement</label>
              <textarea rows={3} defaultValue="Structuring context schemas for extreme multi-modal discovery matrices. Specializing in recursive token engineering and production grade organizational topologies inside NotePilot AI workspace pipelines." className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50 resize-none leading-relaxed" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1"><RiMapPin2Line /> Location</label>
                <input type="text" defaultValue="San Francisco, CA" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1"><RiGlobalLine /> Website</label>
                <input type="text" defaultValue="rostova.ai" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1"><RiBuilding4Line /> Company</label>
                <input type="text" defaultValue="NotePilot AI Lab" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1"><RiBriefcaseLine /> Occupation</label>
                <input type="text" defaultValue="AI Prompt Engineer" className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="button" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 hover:opacity-90 rounded-xl transition-all shadow-xs">
                <RiSave3Line className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {/* B. SECURITY & ACCESS CONTROL CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <RiShieldFlashLine className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Security Parameters</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Account Password</div>
                <div className="text-[11px] text-slate-400">Last amended 42 days ago</div>
              </div>
              <button className="px-3 py-1.5 text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg  transition-colors inline-flex items-center gap-1">
                <RiLockPasswordLine /> Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Two-Factor Authentication (2FA)</div>
                <div className="text-[11px] text-slate-400">Enforce secure prompt environment access limits</div>
              </div>
              <button 
                onClick={() => setBiometrics(!biometrics)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${biometrics ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
              >
                <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out mt-0.5 ${biometrics ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Active Workspace Node Connections */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">Active Authenticated Devices</label>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-850 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <div className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <RiMacbookLine className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">Apple MacBook Pro 16" (Current Session)</p>
                      <p className="text-[10px] text-slate-400 font-mono">IP: 192.141.22.84 • San Francisco, USA</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <RiSmartphoneLine className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">iPhone 15 Pro Max</p>
                      <p className="text-[10px] text-slate-400 font-mono">IP: 104.92.18.21 • Mobile Network</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-semibold text-slate-400 hover:text-red-500 transition-colors">Revoke</button>
                </div>
              </div>
            </div>
          </div>

          {/* C. PREFERENCES MATRIX CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <RiSettings3Line className="w-4 h-4 text-teal-500" />
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Application Preferences</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-400 dark:text-slate-500">Workspace Theme Layout</label>
                <div className="flex gap-1 p-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl">
                  {['light', 'dark', 'system'].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setActiveTheme(t)}
                      className={`flex-1 py-1 text-center font-medium rounded-lg capitalize transition-all ${activeTheme === t ? 'bg-white dark:bg-slate-800 shadow-2xs text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-400 dark:text-slate-500">Editor Typography Mode</label>
                <select className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none appearance-none cursor-pointer">
                  <option>Prose Text (Standard)</option>
                  <option>Developer Markdown (Mono)</option>
                  <option>Minimalist Focus Mode</option>
                </select>
              </div>
            </div>

            {/* Quick Component Switches Container */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Continuous Auto-Save</p>
                  <p className="text-[10px] text-slate-400">Local storage synchronization</p>
                </div>
                <button 
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${autoSave ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <span className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ${autoSave ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Gemini Live Suggestions</p>
                  <p className="text-[10px] text-slate-400">Inline copilot heuristics</p>
                </div>
                <button 
                  onClick={() => setAiSuggestions(!aiSuggestions)}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${aiSuggestions ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800'}`}
                >
                  <span className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ${aiSuggestions ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Push Notifications</p>
                  <p className="text-[10px] text-slate-400">Collaboration updates</p>
                </div>
                <button className="relative inline-flex h-4 w-7 shrink-0 bg-slate-200 dark:bg-slate-800 rounded-full">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-white mt-0.5 translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Sticky Profile Dashboard Context Panel (30%) */}
        <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-6">
          
          {/* A. STICKY QUICK PROFILE PROFILE VIEWER CARD */}
          <div className="bg-gradient-to-b from-indigo-500/5 via-purple-500/0 to-transparent p-px rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80" 
                  alt="Avatar Mini" 
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Elena Rostova</h3>
                  <div className="flex gap-1 mt-0.5">
                    <span className="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-500 px-1.5 rounded">Architect</span>
                    <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 px-1.5 rounded">Pro</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-850 text-xs font-medium text-slate-600 dark:text-slate-400 pt-2">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-400">Member Since</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">Feb 11, 2025</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-400">Current Workspace</span>
                  <span className="text-slate-800 dark:text-slate-200">Production Main</span>
                </div>
                <div className="py-2 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Storage Consumption</span>
                    <span className="font-mono text-indigo-500">4.2 GB / 100 GB</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '4.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. EARNED PREMIUM ACHIEVEMENTS MATRIX */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <RiMedal2Line className="w-3.5 h-3.5 text-amber-500" />
              <span>Workspace Badges</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 rounded-md border border-blue-100/30">Early Adopter</span>
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 rounded-md border border-purple-100/30">AI Creator</span>
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-md border border-emerald-100/30">100+ Generation Cluster</span>
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 rounded-md border border-amber-100/30">Pro Member</span>
              <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-md">Verified Operator</span>
            </div>
          </div>

          {/* C. USAGE INSIGHTS ANALYTICS RADIALS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <RiPieChart2Line className="w-3.5 h-3.5 text-indigo-500" />
              <span>Usage Insights</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <div className="text-[10px] font-medium text-slate-400 uppercase">AI Allocations</div>
                <div className="text-lg font-bold font-display text-indigo-500">83%</div>
                <p className="text-[9px] text-slate-400">High usage vector</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <div className="text-[10px] font-medium text-slate-400 uppercase">Storage Volume</div>
                <div className="text-lg font-bold font-display text-purple-500">4.2%</div>
                <p className="text-[9px] text-slate-400">95.8 GB remaining</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <div className="text-[10px] font-medium text-slate-400 uppercase">Notes Indexed</div>
                <div className="text-lg font-bold font-display text-teal-500">1.4K</div>
                <p className="text-[9px] text-slate-400">Optimal schema sync</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <div className="text-[10px] font-medium text-slate-400 uppercase">Favorite Density</div>
                <div className="text-lg font-bold font-display text-amber-500">13.1%</div>
                <p className="text-[9px] text-slate-400">Healthy selection rate</p>
              </div>
            </div>
          </div>

          {/* D. CHRONOLOGICAL RECENT ACTIVITY TIMELINE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              System Telemetry Log
            </div>

            <div className="space-y-3 relative before:absolute before:inset-y-1 before:left-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-850">
              <div className="relative pl-6 text-xs">
                <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Created Document Node</p>
                <p className="text-[10px] text-slate-400 font-mono">14 mins ago • 'Q3 Strategy'</p>
              </div>
              <div className="relative pl-6 text-xs">
                <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-teal-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Updated Profile Parameters</p>
                <p className="text-[10px] text-slate-400 font-mono">2 hours ago • Location Changed</p>
              </div>
              <div className="relative pl-6 text-xs">
                <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Invoked Gemini Content Summary</p>
                <p className="text-[10px] text-slate-400 font-mono">Yesterday at 6:11 PM</p>
              </div>
              <div className="relative pl-6 text-xs">
                <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Generated Indexing Metadata Tags</p>
                <p className="text-[10px] text-slate-400 font-mono">July 16, 2026</p>
              </div>
              <div className="relative pl-6 text-xs">
                <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-slate-400 ring-4 ring-white dark:ring-slate-900"></span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Restored Document Matrix from Trash</p>
                <p className="text-[10px] text-slate-400 font-mono">July 12, 2026</p>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* 4. BOTTOM FOOTER SECTION: CONNECTED ACCOUNT CREDENTIALS */}
      <footer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* ACCOUNT OAUTH CONNECTIONS MATRIX */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Connected Accounts</h3>
            <p className="text-[11px] text-slate-500">Manage federated identity linkages for cross-environment syncing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiGoogleFill className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="font-medium">Google Link</span>
              </div>
              <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-emerald-500 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded">
                <RiCheckboxCircleLine /> Linked
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiGithubFill className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="font-medium">GitHub Repository</span>
              </div>
              <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-emerald-500 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded">
                <RiCheckboxCircleLine /> Linked
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiMicrosoftFill className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-400">Microsoft Exchange</span>
              </div>
              <button className="text-[10px] font-bold text-indigo-500 hover:underline">Connect</button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiDiscordFill className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-400">Discord Comms</span>
              </div>
              <button className="text-[10px] font-bold text-indigo-500 hover:underline">Connect</button>
            </div>
          </div>
        </div>

        {/* CRITICAL DESTRUCTIVE DANGER ZONE PANEL */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200/50 dark:border-red-950/40 p-6 shadow-2xs space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-500/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1 flex items-center gap-1.5">
              <RiErrorWarningLine className="w-4 h-4" /> Danger Zone Operations
            </h3>
            <p className="text-[11px] text-slate-500">Destructive workspace processes. These modifications are absolute.</p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <button type="button" className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-zinc-500 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
              <RiDownloadCloud2Line className="w-3.5 h-3.5" /> Export Data Vault
            </button>
            <button type="button" className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400 rounded-xl border border-amber-200/40 dark:border-amber-900/20 transition-colors">
              <RiShutDownLine className="w-3.5 h-3.5" /> Deactivate Account Node
            </button>
            <button type="button" className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors shadow-2xs shadow-red-500/10">
              Destroy Account Permanently
            </button>
          </div>
        </div>

      </footer>

    </div>
  );
}