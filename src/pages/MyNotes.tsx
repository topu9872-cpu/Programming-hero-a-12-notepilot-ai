import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Grid,
  List,
  Plus,
  SlidersHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { RiFolderOpenLine } from "react-icons/ri";
import { authClient } from "../lib/auth-client";
// Assuming deleteNote exists in your ServerRoute file alongside updateNote
import { getMyNotes, updateNote, deleteNote } from "../api/ServerRoute";
import { ImageBBUpload } from "../lib/ImageBBUpload";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  favorite: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    name: string;
    avatar: string;
    bio?: string;
    isVerified?: boolean;
  };
  featured?: boolean;
  aiGenerated?: boolean;
}

interface EditNoteFormData {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  coverImage: File | string | null;
  tags: string[];
  featured: boolean;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  author?: Note["author"];
}

interface RawNoteData {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: unknown;
  createdAt?: string;
  publishedAt?: string;
  date?: string;
  coverImage?: string;
  author?: {
    name?: string;
    avatar?: string;
    bio?: string;
    isVerified?: boolean;
  };
}

const MyNotes = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [view, setView] = useState("grid");
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNote, setEditNote] = useState<EditNoteFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const categoriesList = [
    "All",
    "AI",
    "Programming",
    "React",
    "TypeScript",
    "JavaScript",
    "Design",
    "Career",
    "Productivity",
  ];

  // Debounce search input to prevent API spam
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 30);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchNotes = async () => {
    if (!user?.id) {
      setNotes([]);
      setError("Please login to view your notes.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = (await getMyNotes(user.id, {
        page,
        limit: 12,
        search: debouncedSearch,
        sort:
          sort === "Latest"
            ? "newest"
            : sort === "Oldest"
              ? "oldest"
              : "newest",
      })) as {
        notes: RawNoteData[];
        totalNotes: number;
        currentPage: number;
        totalPages: number;
      };

      const normalizedNotes = Array.isArray(response.notes)
        ? response.notes.map((note: RawNoteData) => ({
            id: String(note._id || note.id || ""),
            title: String(note.title || "Untitled note"),
            description: String(note.description || ""),
            content: String(note.content || note.description || ""),
            category: String(note.category || "Uncategorized"),
            tags: Array.isArray(note.tags) ? note.tags.map(String) : [],
            date: String(note.createdAt || note.publishedAt || note.date || ""),
            favorite: false, // Defaulting to false unless your backend returns this
            coverImage: note.coverImage ? String(note.coverImage) : undefined,
          }))
        : [];

      setNotes(normalizedNotes);
      setTotalPages(response.totalPages);
      setPage(response.currentPage);
    } catch (fetchError) {
      console.error(fetchError);
      setError("Unable to load your notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Run fetchNotes when debouncedSearch or page/sort changes
  useEffect(() => {
    fetchNotes();
  }, [user?.id, page, debouncedSearch, sort]);

  const toggleFavorite = async (id: string) => {
    const noteToUpdate = notes.find((n) => n.id === id);
    if (!noteToUpdate) return;

    const newFavoriteStatus = !noteToUpdate.favorite;

    // Optimistic UI update
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, favorite: newFavoriteStatus } : note,
      ),
    );

    try {
      // Execute the backend call (uncomment/adjust if your backend supports favoriting)
      // await updateNote(id, { favorite: newFavoriteStatus });
    } catch (error) {
      // Revert UI on failure
      toast.error("Failed to update favorite status.");
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, favorite: !newFavoriteStatus } : note,
        ),
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteNote(id);

      if (res.acknowledged) {
        toast.success("Note deleted successfully.");
      

navigate(0);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the note. Please try again.");
      fetchNotes();
    }
  };

  const handleEdit = (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (!note) {
      toast.error("Unable to open note editor.");
      return;
    }

    setEditNote({
      id: note.id,
      title: note.title,
      description: note.description || "",
      content: note.content,
      category: note.category,
      coverImage: note.coverImage || null,
      tags: note.tags,
      featured: note.featured ?? false,
      aiGenerated: note.aiGenerated ?? false,
      createdAt: note.createdAt || note.date,
      updatedAt: note.updatedAt || note.date,
      author: note.author,
    });
    setTagInput("");
    setEditModalOpen(true);
  };

  const filteredNotes = notes.filter((note) => {
    const titleMatches =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = category === "All" || note.category === category;
    return titleMatches && categoryMatches;
  });

  const handleEditInputChange = <K extends keyof EditNoteFormData>(
    field: K,
    value: EditNoteFormData[K],
  ) => {
    if (!editNote) return;
    setEditNote({
      ...editNote,
      [field]: value,
      updatedAt: new Date().toISOString().split("T")[0],
    });
  };

  const handleEditTagAdd = (tag: string) => {
    if (!editNote || !tag.trim()) return;
    const cleanTag = tag.trim();
    if (!editNote.tags.includes(cleanTag)) {
      handleEditInputChange("tags", [...editNote.tags, cleanTag]);
    }
    setTagInput("");
  };

  const handleEditTagRemove = (index: number) => {
    if (!editNote) return;
    handleEditInputChange(
      "tags",
      editNote.tags.filter((_, idx) => idx !== index),
    );
  };

  const submitEdit = async () => {
    if (!editNote) return;
    if (!user?.id) {
      toast.error("You must be logged in to edit notes.");
      return;
    }

    setIsSaving(true);
    const today = new Date().toISOString().split("T")[0];

    let coverImageUrl: string | null = null;

    if (editNote.coverImage && editNote.coverImage instanceof File) {
      try {
        coverImageUrl = await ImageBBUpload(editNote.coverImage);
      } catch (uploadError) {
        console.error("Cover image upload failed", uploadError);
        toast.error("Cover image upload failed. Please try again.");
        setIsSaving(false);
        return;
      }
    }

    const payload = {
      title: editNote.title,
      description: editNote.description,
      content: editNote.content,
      category: editNote.category,
      coverImage:
        coverImageUrl ??
        (typeof editNote.coverImage === "string"
          ? editNote.coverImage
          : undefined),
      tags: editNote.tags,
      featured: editNote.featured,
      aiGenerated: editNote.aiGenerated,
      author: editNote.author,
      createdAt: editNote.createdAt,
      updatedAt: today,
    } as Partial<Note>;

    try {
      await updateNote(editNote.id, payload);
      toast.success("Note updated successfully.");
      setEditModalOpen(false);
      fetchNotes();
    } catch (updateError) {
      console.error(updateError);
      toast.error("Unable to save note changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sort === "Latest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "Oldest")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto transition-colors duration-200">
      {/* Header Panel */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            My Notes
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your personal workspace.
          </p>
        </div>
        <button
          onClick={() => navigate("/create-note")}
          className="flex items-center gap-1.5 bg-linear-to-r from-blue-500 to-purple-500 hover:opacity-95 text-white font-medium py-1.5 px-3 rounded-lg shadow-sm text-xs transition w-full sm:w-auto justify-center"
        >
          <Plus size={14} />
          Create Note
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search notes..."
            className="w-full pl-8 pr-3 py-1 text-xs bg-transparent text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1">
            <RiFolderOpenLine className="w-3 h-3 text-slate-400" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1); // Reset pagination on category change
              }}
              className="px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1); // Reset pagination on sort change
              }}
              className="px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="A-Z">A-Z</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setView("grid")}
              className={`p-1 rounded-md ${view === "grid" ? "bg-white dark:bg-slate-700 text-blue-500 shadow-xs" : "text-slate-400"}`}
            >
              <Grid size={12} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1 rounded-md ${view === "list" ? "bg-white dark:bg-slate-700 text-blue-500 shadow-xs" : "text-slate-400"}`}
            >
              <List size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Layout Grid */}
      {loading ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading your notes…
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : sortedNotes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-xs text-slate-500">
            No notes found. Try adjusting your search or sort filters.
          </p>
        </div>
      ) : (
        <>
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "flex flex-col gap-2"
            }
          >
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition flex flex-col overflow-hidden ${
                  view === "list"
                    ? "flex-row items-center p-3 gap-3 h-20"
                    : "h-62.5"
                }`}
              >
                {/* Cover Image */}
                {note.coverImage && (
                  <div
                    className={`${view === "list" ? "w-16 h-14 rounded-lg" : "w-full h-24"} shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-850`}
                  >
                    <img
                      src={note.coverImage}
                      alt={note.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Text Layout Element */}
                <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate flex-1">
                        {note.title}
                      </h3>
                    </div>

                    <p className="text-slate-700 dark:text-slate-200 text-[11px] leading-normal line-clamp-2">
                      {note.content}
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* Category and Quick Actions Row */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-sm">
                        {note.category}
                      </span>

                      {/* Inline Edit / Delete Actions */}
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                        <button
                          onClick={() => handleEdit(note.id)}
                          title="Edit Note"
                          className="hover:text-blue-500 dark:hover:text-blue-400 p-0.5 rounded transition"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          title="Delete Note"
                          className="hover:text-red-500 dark:hover:text-red-400 p-0.5 rounded transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Card Bottom Strip */}
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-1.5 shrink-0">
                      <span className="text-[9px] text-slate-400 font-medium">
                        {note.date}
                      </span>
                      <button
                        onClick={() => toggleFavorite(note.id)}
                        className="focus:outline-none p-0.5"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {editModalOpen && editNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex flex-col gap-3 border-b border-slate-200 dark:border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Edit Note
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Update note details and save changes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Title
                  <input
                    type="text"
                    value={editNote.title}
                    onChange={(e) =>
                      handleEditInputChange("title", e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Category
                  <select
                    value={editNote.category}
                    onChange={(e) =>
                      handleEditInputChange("category", e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                Description
                <input
                  type="text"
                  value={editNote.description}
                  onChange={(e) =>
                    handleEditInputChange("description", e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>

              <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                Content
                <textarea
                  value={editNote.content}
                  onChange={(e) =>
                    handleEditInputChange("content", e.target.value)
                  }
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Cover Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleEditInputChange("coverImage", e.target.files[0]);
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>

                <label className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Tags
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleEditTagAdd(tagInput);
                        }
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => handleEditTagAdd(tagInput)}
                      className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editNote.tags.map((tag, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleEditTagRemove(idx)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      >
                        {tag}
                        <span className="text-slate-400">×</span>
                      </button>
                    ))}
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={editNote.featured}
                    onChange={(e) =>
                      handleEditInputChange("featured", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={editNote.aiGenerated}
                    onChange={(e) =>
                      handleEditInputChange("aiGenerated", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                  />
                  AI Generated
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitEdit}
                  disabled={isSaving}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNotes;
