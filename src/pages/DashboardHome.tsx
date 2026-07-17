import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Send, 
  FileText, 
  Sparkles, 
  Tags, 
  Wand2, 
  Eye, 
  Type,
  FolderOpen
} from 'lucide-react';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Dynamic metrics updates whenever content changes
  useEffect(() => {
    const trimmed = content.trim();
    setWordCount(trimmed === '' ? 0 : trimmed.split(/\s+/).length);
    setCharacterCount(content.length);
  }, [content]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-250">
      
      {/* Header Panel Dashboard Control */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Note</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Write and organize your ideas with NotePilot AI.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-4 rounded-xl transition">
            <Save size={18} />
            Save Draft
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-95 text-white font-medium py-2.5 px-5 rounded-xl shadow transition">
            <Send size={18} />
            Publish
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Workspace: Content Editor Pane */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4 transition-colors">
            
            {/* Note Title Input */}
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full pl-11 pr-4 py-3 text-lg font-bold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
            
            {/* Note Rich Content Input Area */}
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing down your thought workflow here..."
                className="w-full p-4 text-base bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-96 resize-none leading-relaxed transition"
              />
            </div>

            {/* Editor Bottom Meta Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="relative">
                <FolderOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={16} />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-gray-800 pl-10 pr-10 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                >
                  <option value="">Select Category</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                </select>
              </div>

              <div className="relative">
                <Tags className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tags (comma separated)"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Live Preview Area */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 border-b border-gray-50 dark:border-gray-800/60 pb-3 transition-colors">
              <Eye size={18} />
              <h3 className="text-sm font-semibold tracking-wide uppercase">Note Live Preview</h3>
            </div>
            <div className="space-y-2 min-h-[80px]">
              {title || content ? (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title || 'Untitled Document'}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {content || 'No content written yet.'}
                  </p>
                </>
              ) : (
                <span className="text-sm text-gray-400 dark:text-gray-500 italic">Preview parameters populate dynamically as you write...</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Workspace Sidebar: AI Actions & Metrics */}
        <div className="space-y-6">
          
          {/* AI Copilot Intelligence Panel */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4 transition-colors">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Sparkles size={18} />
              <h3 className="text-sm font-bold tracking-wide uppercase">AI Assistant</h3>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <button className="w-full flex items-center gap-3 text-left p-3 text-sm font-medium rounded-xl bg-purple-50/50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border border-purple-100/50 dark:border-purple-900/40 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all">
                <FileText size={16} className="shrink-0 text-purple-500" />
                <span>Generate Summary</span>
              </button>

              <button className="w-full flex items-center gap-3 text-left p-3 text-sm font-medium rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-100/50 dark:border-blue-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all">
                <Tags size={16} className="shrink-0 text-blue-500" />
                <span>Suggest Meta Tags</span>
              </button>

              <button className="w-full flex items-center gap-3 text-left p-3 text-sm font-medium rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100/50 dark:border-emerald-900/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all">
                <Wand2 size={16} className="shrink-0 text-emerald-500" />
                <span>Improve Composition</span>
              </button>
            </div>
          </div>

          {/* Document Telemetry Data Panel */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3 transition-colors">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Document Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60 transition-colors">
                <span className="text-gray-500 dark:text-gray-400">Words count</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{wordCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/60 transition-colors">
                <span className="text-gray-500 dark:text-gray-400">Characters count</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{characterCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 dark:text-gray-400">Sync status</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Synced just now</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateNote;