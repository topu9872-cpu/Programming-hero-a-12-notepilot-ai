import React, { useState, useMemo, useEffect } from 'react';
import { 
  RiSparkling2Line, 
  RiSaveLine, 
  RiSendPlaneLine, 
  RiPriceTag3Line, 
  RiFolderOpenLine, 
  RiAttachmentLine, 
  RiText, 
  RiTimeLine, 
  RiCheckLine,
  RiMagicLine,
  RiTranslate2,
  RiCheckDoubleLine
} from 'react-icons/ri';

export default function CreateNote() {
  // --- Existing State & Functionality Kept Intact ---
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [lastSaved, setLastSaved] = useState('Draft saved just now');
  const [isSaving, setIsSaving] = useState(false);

  // --- Dynamic Metadata Calculations ---
  const { wordCount, charCount, readingTime } = useMemo(() => {
    const words = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
    const chars = content.length;
    const minutes = Math.max(1, Math.ceil(words / 225)); // Average reading speed
    return {
      wordCount: words,
      charCount: chars,
      readingTime: `${minutes} min read`
    };
  }, [content]);

  // Handle adding tags on Enter
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Mock saving trigger
  const handleSave = (type: 'draft' | 'publish') => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSaved(`${type === 'draft' ? 'Draft' : 'Note'} saved at ${time}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased selection:bg-indigo-500/20">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm">
              <RiSparkling2Line className="w-5 h-5 animate-pulse" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight font-display">Create New Note</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Craft your thoughts and supercharge your ideas using Gemini-inspired companion tools.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button 
            onClick={() => handleSave('draft')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-500 active:bg-slate-100 transition-all shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-850 disabled:opacity-50"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          
          <button 
            onClick={() => handleSave('publish')}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-md shadow-indigo-500/10 dark:shadow-indigo-950/20 disabled:opacity-50"
          >
            <RiSendPlaneLine className="w-4 h-4" />
            <span>Publish Note</span>
          </button>
        </div>
      </header>

      {/* MAIN TWO-COLUMN RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Editor Area (70%) */}
        <main className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-6">
            
            {/* Title Input */}
            <div>
              <input 
                type="text"
                placeholder="Title your creation..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl sm:text-3xl font-semibold bg-transparent border-0 border-b border-transparent focus:border-indigo-500/30 placeholder-slate-300 dark:placeholder-slate-700 focus:ring-0 py-1 transition-all rounded-sm font-display focus:outline-none"
              />
            </div>

            {/* Formatting / Decorative Toolbar (Google AI Studio aesthetic) */}
            <div className="flex items-center gap-1 py-1.5 px-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850 text-slate-400 text-xs font-mono">
              <span className="px-2 text-slate-500 dark:text-slate-400 font-sans font-medium">Editor Mode</span>
              <span className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></span>
              <span className="px-2 py-0.5 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 cursor-default select-none">Markdown Supported</span>
            </div>

            {/* Textarea Editor */}
            <div>
              <textarea 
                placeholder="Start typing your thoughts, copy in data, or write a prompt..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                className="w-full bg-transparent border-0 focus:ring-0 resize-y placeholder-slate-400 dark:placeholder-slate-600 text-base leading-relaxed focus:outline-none min-h-[300px]"
              />
            </div>

            {/* Metadata Fields (Category & Tags) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
              
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <RiFolderOpenLine className="w-3.5 h-3.5" />
                  <span>Category</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="work">Work & Projects</option>
                    <option value="personal">Personal Log</option>
                    <option value="research">Research & Docs</option>
                    <option value="ideas">Brainstorming</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <RiPriceTag3Line className="w-3.5 h-3.5" />
                  <span>Tags</span>
                </label>
                <input 
                  type="text"
                  placeholder="Type a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              </div>

            </div>

            {/* Dynamic Tag Chips Container */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 transition-all"
                  >
                    #{tag}
                    <button 
                      onClick={() => removeTag(idx)}
                      className="hover:text-indigo-800 dark:hover:text-indigo-200 ml-0.5 p-0.5 rounded-full"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* UI-Only Attachments Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-950/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <RiAttachmentLine className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <span>Attach supporting documents, code snippets, or asset references</span>
                </div>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-md shadow-2xs border border-slate-200 dark:border-slate-800">
                  Browse
                </span>
              </div>
            </div>

          </div>

          {/* LIVE PREVIEW CARD */}
          <div className="bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Live Preview
              </h3>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {title ? (
                <h2 className="text-xl font-bold font-display mt-0 mb-2">{title}</h2>
              ) : (
                <span className="text-sm italic text-slate-400 dark:text-slate-600 block mb-2">Untitled Document</span>
              )}
              
              {content ? (
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {content}
                </p>
              ) : (
                <p className="text-sm italic text-slate-400 dark:text-slate-600">
                  Your note output preview will dynamically stream here...
                </p>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Sticky Gemini AI Assistant Side Panel (30%) */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-6">
          <div className="bg-gradient-to-b from-indigo-500/5 via-purple-500/0 to-transparent p-px rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            
            <div className="p-5 space-y-4">
              {/* AI Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <RiSparkling2Line className="w-4 h-4 text-indigo-500" />
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></span>
                  </div>
                  <h2 className="text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent">
                    Gemini Workspace Assist
                  </h2>
                </div>
                <span className="text-[10px] font-medium uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                  Ready
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                Select an operational context block below to transform, clean, or augment your current note selection.
              </p>

              {/* AI Actions Menu Stack */}
              <div className="space-y-2 pt-1">
                <button className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border border-slate-100 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <RiMagicLine className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                    <span>Generate Summary</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 transition-colors">⌥S</span>
                </button>

                <button className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border border-slate-100 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <RiText className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    <span>Improve Writing</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-purple-500 transition-colors">⌥I</span>
                </button>

                <button className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border border-slate-100 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <RiPriceTag3Line className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span>Suggest Tags</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-500 transition-colors">⌥T</span>
                </button>

                <button className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border border-slate-100 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <RiTranslate2 className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span>Rewrite Content</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-500 transition-colors">⌥W</span>
                </button>

                <button className="w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border border-slate-100 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 text-slate-700 dark:text-slate-300 transition-all group">
                  <div className="flex items-center gap-2.5">
                    <RiCheckDoubleLine className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                    <span>Fix Grammar</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-pink-500 transition-colors">⌥F</span>
                </button>
              </div>

              {/* Bottom Quick-Prompt Box inside AI Assistant context */}
           <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
  <div className="relative flex items-center">
    <input 
      type="text" 
      placeholder="Ask Gemini to polish this..." 
      className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-purple-500/50 transition-colors"
    />
    <button 
      type="button"
      className="absolute right-1.5 p-1.5 rounded-lg text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/40 active:scale-95 transition-all"
      aria-label="Send to Gemini"
    >
      <RiSparkling2Line className="w-4 h-4" />
    </button>
  </div>
</div>

            </div>
          </div>
        </aside>

      </div>

      {/* FOOTER BAR: Counts, reading metrics, and inline state validation status */}
      <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xs text-xs text-slate-500 dark:text-slate-400">
        
        {/* Dynamic Telemetry Data metrics stack */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{wordCount}</span>
            <span className="text-slate-400">words</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{charCount}</span>
            <span className="text-slate-400">characters</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
            <RiTimeLine className="w-3.5 h-3.5" />
            <span>{readingTime}</span>
          </div>
        </div>

        {/* Sync Status Flag Indicator */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 py-1 px-2.5 rounded-lg border border-slate-100 dark:border-slate-850">
          <div className={`h-1.5 w-1.5 rounded-full ${isSaving ? 'bg-amber-400 animate-ping' : 'bg-indigo-500'}`}></div>
          <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
            {isSaving ? 'Synchronizing alterations...' : lastSaved}
          </span>
        </div>

      </footer>

    </div>
  );
}