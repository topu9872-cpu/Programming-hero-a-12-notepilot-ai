import React, { useState, useMemo } from "react";
import {
  RiSparkling2Line,
  RiSaveLine,
  RiSendPlaneLine,
  RiPriceTag3Line,
  RiFolderOpenLine,
  RiText,
  RiTimeLine,
  RiMagicLine,
  RiTranslate2,
  RiCheckDoubleLine,
  RiImageLine,
  RiLayoutGridLine,
  RiDatabaseLine,
} from "react-icons/ri";
import { authClient } from "../lib/auth-client";
import { ImageBBUpload } from "../lib/ImageBBUpload";
import { notePost } from "../api/ServerRoute";
import { toast } from "sonner";

// 1. Updated Interface to support the Author model properties
interface NoteAuthor {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  emailVerified?: boolean;
}

interface NoteSchemaData {
  title: string;
  description: string;
  content: string;
  category: string;
  coverImage: File | string | null;
  coverGradient: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  aiGenerated: boolean;
  status: "Draft" | "Published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views: number;
  relatedNotes: string[];
  author: NoteAuthor | null;
}

// Extract a base clean state blueprint to safely pass to setFormData on reset
const emptyFormState: NoteSchemaData = {
  title: "",
  description: "",
  content: "",
  category: "Programming",
  coverImage: null,
  coverGradient: "from-indigo-500 to-purple-600",
  tags: [],
  readTime: "1 min",
  featured: false,
  aiGenerated: false,
  status: "Draft",
  createdAt: new Date().toISOString().split("T")[0],
  updatedAt: new Date().toISOString().split("T")[0],
  publishedAt: "",
  views: 0,
  relatedNotes: [],
  author: null,
};

export default function CreateNote() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState<NoteSchemaData>({
    title: "Mastering CSS Grid and Subgrid Layouts",
    description: "Aligning complex UI components across nested structures cleanly.",
    content: "Why subgrid is the true game-changer for dynamic multi-column card designs...",
    category: "Programming",
    coverImage: null,
    coverGradient: "from-indigo-500 to-purple-600",
    tags: ["CSS", "Design-Systems", "UI"],
    readTime: "6 min",
    featured: false,
    aiGenerated: false,
    status: "Draft",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    publishedAt: "",
    views: 0,
    relatedNotes: [],
    author: null,
  });

  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(`Draft state synced: ${formData.updatedAt}`);
  const [selectedAiFeature, setSelectedAiFeature] = useState<string | null>(null);

  const categoriesList = [
    "AI",
    "Programming",
    "React",
    "TypeScript",
    "JavaScript",
    "Design",
    "Career",
    "Productivity",
  ];

  const metrics = useMemo(() => {
    const words = formData.content.trim() === "" ? 0 : formData.content.trim().split(/\s+/).length;
    return {
      wordCount: words,
      charCount: formData.content.length,
      readTime: `${Math.max(1, Math.ceil(words / 225))} min`,
    };
  }, [formData.content]);

  const handleInputChange = (field: keyof NoteSchemaData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString().split("T")[0],
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const cleanTag = tagInput.trim();
      if (!formData.tags.includes(cleanTag)) {
        handleInputChange("tags", [...formData.tags, cleanTag]);
      }
      setTagInput("");
    }
  };

  const executeSubmit = async (targetStatus: "Draft" | "Published") => {
    setIsSaving(true);
    const todayStr = new Date().toISOString().split("T")[0];
    let uploadedImageUrl = formData.coverImage;

    if (formData.coverImage && formData.coverImage instanceof File) {
      try {
        uploadedImageUrl = await ImageBBUpload(formData.coverImage);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed. Submitting without updating cover image.");
      }
    }

    const dynamicAuthor: NoteAuthor | null = user
      ? {
          id: user.id || "",
          name: user.name || "Anonymous",
          email: user.email || "",
          image: user.image || null,
        }
      : null;

    setTimeout(async () => {
      setIsSaving(false);

      const updatedState = {
        coverImage: uploadedImageUrl,
        status: targetStatus,
        author: dynamicAuthor,
        updatedAt: todayStr,
        publishedAt: targetStatus === "Published" ? todayStr : formData.publishedAt,
      };

      setFormData((prev) => ({
        ...prev,
        ...updatedState,
      }));

      setLastSaved(
        `Saved successfully at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
      );

      const body: NoteSchemaData = {
        ...formData,
        ...updatedState,
        readTime: metrics.readTime,
      };

      try {
        const data = await notePost(body as any);
        if (data.acknowledged) {
          toast.success("Note created successfully!");
          // FIXED: passing real default runtime runtime object definition value now instead of a type reference!
          setFormData(emptyFormState); 
        } else {
          toast.error("Something went wrong!");
        }
      } catch (err) {
        console.error("Database submission failure:", err);
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      {/* HEADER ACTION BAR */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`p-1.5 rounded-lg text-white shadow-sm bg-gradient-to-tr ${formData.coverGradient}`}>
              <RiLayoutGridLine className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight">Structured Note Schema</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Editing structural dataset for your full-stack notes architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => executeSubmit("Draft")}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-slate-200 rounded-xl hover:bg-slate-50 dark:bg-white/5 dark:border-slate-800 dark:hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm"
          >
            <RiSaveLine className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => executeSubmit("Published")}
            disabled={isSaving}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r ${formData.coverGradient} rounded-xl opacity-90 hover:opacity-100 active:scale-[0.98] disabled:opacity-50 transition-all shadow-md`}
          >
            <RiDatabaseLine className="w-4 h-4" />
            <span>Submit to Database</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
        {/* STRUCTURAL EDITOR COL */}
        <main className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-6">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Title your note Schema..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full text-2xl sm:text-3xl font-bold bg-transparent border-0 focus:ring-0 py-1 focus:outline-none placeholder-slate-300 dark:placeholder-slate-700"
              />
              <input
                type="text"
                placeholder="Add structural description..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full text-sm bg-transparent border-0 text-slate-500 dark:text-slate-400 focus:ring-0 focus:outline-none placeholder-slate-300 dark:placeholder-slate-700"
              />
            </div>

            {/* Content Payload Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 px-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                <span className="font-mono">Payload property: "content"</span>
                <span className="text-slate-400 font-medium">Read time estimate: {metrics.readTime}</span>
              </div>
              <textarea
                placeholder="Write target document layout body contents..."
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows={10}
                className="w-full bg-transparent border-0 focus:ring-0 resize-y focus:outline-none text-base leading-relaxed min-h-[200px] placeholder-slate-400 dark:placeholder-slate-600"
              />
            </div>

            {/* Classifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-150 dark:border-slate-850">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <RiFolderOpenLine className="w-3.5 h-3.5" />
                  <span>Category</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none cursor-pointer text-slate-900 dark:text-slate-100 shadow-sm appearance-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {categoriesList.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-2"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <RiImageLine className="w-3.5 h-3.5" />
                  <span>Cover Image Link</span>
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleInputChange("coverImage", e.target.files[0]);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none font-mono text-xs text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <RiPriceTag3Line className="w-3.5 h-3.5" />
                  <span>Tags Structure</span>
                </label>
                <input
                  type="text"
                  placeholder="Add tag + Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* Tag Badges array rendering */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-indigo-50/10">
                {formData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleInputChange("tags", formData.tags.filter((_, i) => i !== idx))}
                      className="hover:text-red-500 ml-1 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Flags checkboxes */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Featured Post</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.aiGenerated}
                  onChange={(e) => handleInputChange("aiGenerated", e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">AI Assisted Content</span>
                </div>
              </label>
            </div>

            {/* BOTTOM DEDICATED FORM SUBMIT AREA */}
            <div className="pt-4 border-t border-slate-250 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => executeSubmit("Published")}
                disabled={isSaving}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm text-white bg-gradient-to-r ${formData.coverGradient} rounded-xl shadow-md hover:opacity-95 transition-all`}
              >
                <RiSendPlaneLine className="w-4 h-4" />
                <span>Submit and Sync Document</span>
              </button>
            </div>
          </div>
        </main>

        {/* SIDE PANELS */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-855">
              <div className="flex items-center gap-2">
                <RiSparkling2Line className="w-4 h-4 text-indigo-500 animate-pulse" />
                <h2 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 bg-clip-text text-transparent">
                  Gemini Core Context
                </h2>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                Sync
              </span>
            </div>

            <div className="space-y-2">
              {[
                { id: "summary", label: "Generate Summary", shortcut: "⌥S", icon: <RiMagicLine /> },
                { id: "writing", label: "Improve Writing", shortcut: "⌥I", icon: <RiText /> },
                { id: "schema", label: "Suggest Schema Tags", shortcut: "⌥T", icon: <RiPriceTag3Line /> },
                { id: "translate", label: "Translate Structure", shortcut: "⌥W", icon: <RiTranslate2 /> },
                { id: "clean", label: "Analyze Cleanliness", shortcut: "⌥F", icon: <RiCheckDoubleLine /> },
              ].map((btn) => {
                const isSelected = selectedAiFeature === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => setSelectedAiFeature(isSelected ? null : btn.id)}
                    className={`w-full flex items-center justify-between p-2.5 text-left text-xs font-medium rounded-xl border transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/30 shadow-xs"
                        : "border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isSelected ? "text-indigo-500" : "text-slate-400"}>{btn.icon}</span>
                      <span>{btn.label}</span>
                    </div>
                    <span className={`text-[10px] ${isSelected ? "text-indigo-400" : "text-slate-400"}`}>
                      {btn.shortcut}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-850 relative flex items-center">
              <input
                type="text"
                placeholder={
                  selectedAiFeature
                    ? `Instruct context for ${selectedAiFeature}...`
                    : "Instruct companion prompt..."
                }
                className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <button
                type="button"
                className="absolute right-1.5 p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
              >
                <RiSparkling2Line className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* METRICS FOOTER */}
      <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xs text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            WORDS: <span className="font-semibold text-slate-700 dark:text-slate-300">{metrics.wordCount}</span>
          </div>
          <div>
            CHARS: <span className="font-semibold text-slate-700 dark:text-slate-300">{metrics.charCount}</span>
          </div>
          <div>
            STATUS:{" "}
            <span className="font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {formData.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <RiTimeLine className="w-3.5 h-3.5" /> <span>UPDATED: {formData.updatedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 py-1 px-2.5 rounded-lg border border-slate-100 dark:border-slate-850">
          <div className={`h-1.5 w-1.5 rounded-full ${isSaving ? "bg-amber-400 animate-ping" : "bg-indigo-500"}`}></div>
          <span className="text-[11px] text-slate-600 dark:text-slate-400">
            {isSaving ? "Syncing active data model..." : lastSaved}
          </span>
        </div>
      </footer>
    </div>
  );
}