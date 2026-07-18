import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'; // 1. Added React Router's hooks manager
import { 
  RiSparkling2Line, RiTimeLine, RiEyeLine, RiCheckboxCircleLine, 
  RiCalendarEventLine, RiHeartLine, RiBookmarkLine, RiUserLine, 
  RiFileList3Line, RiArrowLeftSLine, RiArrowRightSLine
} from 'react-icons/ri';
import { getAllNotesDetails, Notesfavorited } from '../../api/ServerRoute';
import { authClient } from '../../lib/auth-client';

export interface Note {
  _id: string;
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
  likes?: number;
  tags: string[];
  isTrending?: boolean;
  aiGenerated?: boolean;
  featured?: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export default function NoteDetails() {
  // Extract id directly from the URL route context safely via useParams hook
  const { id } = useParams<{ id: string }>(); 
 
  const [note, setNote] = useState<Note | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
 
  useEffect(() => {
  if (!id) return;

  getAllNotesDetails(id)
    .then((data) => {
      setNote(data);
    })
    .catch((error) => {
      console.error(error);
    });

}, [id]);

const {data:session}=authClient.useSession()
const user=session?.user

const handleFavorite = async () => {
  const next = !isFavorited;

  try {
  const data=  await Notesfavorited({
      isFavorited: next,
      note,
      user,
    });
console.log(data)
    setIsFavorited(next);
  } catch (error) {
    console.error(error);
  }
};

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400 font-sans antialiased">
        <div className="text-center space-y-2">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold tracking-wide">Loading note content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-4xl mt-16 mx-auto space-y-6">
        
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className={`absolute inset-0 bg-gradient-to-r ${note.coverGradient || 'from-indigo-500/10 to-purple-500/10'} opacity-[0.07] dark:opacity-[0.12] z-0`} />
          <div className="relative p-6 sm:p-8 lg:p-10 z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 shadow-2xs">
                {note.category}
              </span>
              {note.aiGenerated && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                  <RiSparkling2Line className="w-3.5 h-3.5 animate-pulse" />
                  <span>AI Generated</span>
                </span>
              )}
              {note.featured && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                  <RiBookmarkLine className="w-3.5 h-3.5" />
                  <span>Featured</span>
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {note.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-3xl font-medium leading-relaxed">
              {note.description}
            </p>
          </div>
        </div>

        {/* MAIN ARTICLE MODULE */}
        <main className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* AUTHOR METADATA ROW */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${note.coverGradient || 'from-indigo-500/10 to-purple-500/10'} rounded-xl blur-xs opacity-40`} />
                  <div className="relative w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-white dark:border-slate-700 shadow-xs">
                    {note.author?.avatar ? (
                      <img src={note.author.avatar} alt={note.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <RiUserLine className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{note.author?.name || 'Anonymous User'}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{note.author?.bio || 'Workspace member'}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="button" 
                 onClick={handleFavorite}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2.5 p-2.5 px-6 text-xs font-medium rounded-xl border transition-all ${
                    isFavorited 
                      ? 'border-red-200 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 shadow-2xs' 
                      : 'border-slate-150 dark:border-slate-850 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/40 '
                  }`}
                >
                  {isFavorited ? <RiHeartLine className="w-4 h-4 text-red-500" /> : <RiHeartLine className="w-4 h-4 text-slate-400" />}
                  <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>

            {/* METADATA PILLS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiTimeLine className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Read Time</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{note.readTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiEyeLine className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Metrics</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{note.views} views</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiCheckboxCircleLine className="w-4 h-4 text-emerald-500" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Lifecycle</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{note.status || 'Active'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiCalendarEventLine className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Created</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiCalendarEventLine className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Updated</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-850/60">
                <RiCalendarEventLine className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider">Published</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {note.publishedAt ? new Date(note.publishedAt).toLocaleDateString() : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* TAG CHIPS */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {note.tags?.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 cursor-default">
                  #{tag}
                </span>
              ))}
            </div>

            {/* MAIN CONTENT AREA */}
            <article className="prose prose-slate dark:prose-invert max-w-none pt-4 border-t border-slate-100 dark:border-slate-850 text-slate-800 dark:text-slate-200">
              <div className="text-base sm:text-lg leading-relaxed space-y-6">
                {note.content ? (
                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                ) : (
                  <>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      Why subgrid is the true game-changer for dynamic multi-column card designs...
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2">
                      <RiFileList3Line className="w-5 h-5 text-indigo-500" />
                      The Core Engine Architecture
                    </h3>
                    <p>
                      When working inside traditional CSS Grid models, columns and rows are isolated to the direct parent container.
                    </p>
                    <blockquote className="border-l-4 border-purple-500 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-r-xl my-6 text-sm italic text-slate-600 dark:text-slate-400 font-medium shadow-xs">
                      "Subgrid allows nested grids to participate in the sizing parameters defined on the main track layout..."
                    </blockquote>
                  </>
                )}
              </div>
            </article>
          </div>

        
        </main>
      </div>
    </div>
  );
}