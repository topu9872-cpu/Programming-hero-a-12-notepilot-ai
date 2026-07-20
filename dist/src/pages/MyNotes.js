import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid, List, Plus, SlidersHorizontal, Pencil, Trash2, } from "lucide-react";
import { RiFolderOpenLine as FolderIcon } from "react-icons/ri";
import { authClient } from "../lib/auth-client.js";
import { getMyNotes, updateNote, deleteNote } from "../api/ServerRoute.js";
import { ImageBBUpload } from "../lib/ImageBBUpload.js";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../ui/DeleteConfirmModal.js";
const MyNotes = () => {
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("Latest");
    const [view, setView] = useState("grid");
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [tagInput, setTagInput] = useState("");
    // Added missing states for deletion modal
    const [activeDeleteTarget, setActiveDeleteTarget] = useState(null);
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
                sort: sort === "Latest"
                    ? "newest"
                    : sort === "Oldest"
                        ? "oldest"
                        : "newest",
            }));
            const normalizedNotes = Array.isArray(response.notes)
                ? response.notes.map((note) => ({
                    id: String(note._id || note.id || ""),
                    title: String(note.title || "Untitled note"),
                    description: String(note.description || ""),
                    readTime: note?.readTime || '',
                    content: String(note.content || note.description || ""),
                    category: String(note.category || "Uncategorized"),
                    tags: Array.isArray(note.tags) ? note.tags.map(String) : [],
                    date: String(note.createdAt || note.publishedAt || note.date || ""),
                    favorite: false,
                    coverImage: note.coverImage ? String(note.coverImage) : undefined,
                }))
                : [];
            setNotes(normalizedNotes);
            setTotalPages(response.totalPages);
            setPage(response.currentPage);
        }
        catch (fetchError) {
            console.error(fetchError);
            setError("Unable to load your notes. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNotes();
    }, [user?.id, page, debouncedSearch, sort]);
    const executeDelete = async () => {
        if (!activeDeleteTarget)
            return;
        try {
            const res = await deleteNote(activeDeleteTarget.id);
            if (res.acknowledged || res.success || res) {
                toast.success("Note deleted successfully.");
                fetchNotes();
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to delete the note. Please try again.");
        }
        finally {
            setActiveDeleteTarget(null);
        }
    };
    const handleEdit = (id) => {
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
        const titleMatches = note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase());
        const categoryMatches = category === "All" || note.category === category;
        return titleMatches && categoryMatches;
    });
    const handleEditInputChange = (field, value) => {
        if (!editNote)
            return;
        setEditNote({
            ...editNote,
            [field]: value,
            updatedAt: new Date().toISOString().split("T")[0],
        });
    };
    const handleEditTagAdd = (tag) => {
        if (!editNote || !tag.trim())
            return;
        const cleanTag = tag.trim();
        if (!editNote.tags.includes(cleanTag)) {
            handleEditInputChange("tags", [...editNote.tags, cleanTag]);
        }
        setTagInput("");
    };
    const handleEditTagRemove = (index) => {
        if (!editNote)
            return;
        handleEditInputChange("tags", editNote.tags.filter((_, idx) => idx !== index));
    };
    const submitEdit = async () => {
        if (!editNote)
            return;
        if (!user?.id) {
            toast.error("You must be logged in to edit notes.");
            return;
        }
        setIsSaving(true);
        const today = new Date().toISOString().split("T")[0];
        let coverImageUrl = null;
        if (editNote.coverImage && editNote.coverImage instanceof File) {
            try {
                coverImageUrl = await ImageBBUpload(editNote.coverImage);
            }
            catch (uploadError) {
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
            coverImage: coverImageUrl ??
                (typeof editNote.coverImage === "string"
                    ? editNote.coverImage
                    : undefined),
            tags: editNote.tags,
            featured: editNote.featured,
            aiGenerated: editNote.aiGenerated,
            author: editNote.author,
            createdAt: editNote.createdAt,
            updatedAt: today,
        };
        try {
            await updateNote(editNote.id, payload);
            toast.success("Note updated successfully.");
            setEditModalOpen(false);
            fetchNotes();
        }
        catch (updateError) {
            console.error(updateError);
            toast.error("Unable to save note changes.");
        }
        finally {
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
    return (_jsxs("div", { className: "p-4 space-y-4 max-w-7xl mx-auto transition-colors duration-200", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-lg font-bold text-slate-900 dark:text-white", children: "My Notes" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Your personal workspace." })] }), _jsxs("button", { onClick: () => navigate("/create-note"), className: "flex items-center gap-1.5 bg-linear-to-r from-blue-500 to-purple-500 hover:opacity-95 text-white font-medium py-1.5 px-3 rounded-lg shadow-sm text-xs transition w-full sm:w-auto justify-center", children: [_jsx(Plus, { size: 14 }), "Create Note"] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row gap-2.5 items-center justify-between", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400", size: 14 }), _jsx("input", { type: "search", value: search, onChange: (e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }, placeholder: "Search notes...", className: "w-full pl-8 pr-3 py-1 text-xs bg-transparent text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(FolderIcon, { className: "w-3 h-3 text-slate-400" }), _jsx("select", { value: category, onChange: (e) => {
                                            setCategory(e.target.value);
                                            setPage(1);
                                        }, className: "px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200", children: categoriesList.map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(SlidersHorizontal, { className: "w-3 h-3 text-slate-400" }), _jsxs("select", { value: sort, onChange: (e) => {
                                            setSort(e.target.value);
                                            setPage(1);
                                        }, className: "px-2 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200", children: [_jsx("option", { value: "Latest", children: "Latest" }), _jsx("option", { value: "Oldest", children: "Oldest" }), _jsx("option", { value: "A-Z", children: "A-Z" })] })] }), _jsxs("div", { className: "flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg", children: [_jsx("button", { onClick: () => setView("grid"), className: `p-1 rounded-md ${view === "grid" ? "bg-white dark:bg-slate-700 text-blue-500 shadow-xs" : "text-slate-400"}`, children: _jsx(Grid, { size: 12 }) }), _jsx("button", { onClick: () => setView("list"), className: `p-1 rounded-md ${view === "list" ? "bg-white dark:bg-slate-700 text-blue-500 shadow-xs" : "text-slate-400"}`, children: _jsx(List, { size: 12 }) })] })] })] }), loading ? (_jsx("div", { className: "text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80", children: _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Loading your notes\u2026" }) })) : error ? (_jsx("div", { className: "text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80", children: _jsx("p", { className: "text-sm text-red-500", children: error }) })) : sortedNotes.length === 0 ? (_jsx("div", { className: "text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80", children: _jsx("p", { className: "text-xs text-slate-500", children: "No notes found. Try adjusting your search or sort filters." }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: view === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            : "flex flex-col gap-2", children: sortedNotes.map((note) => (_jsxs("div", { className: `bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition flex flex-col overflow-hidden ${view === "list"
                                ? "flex-row items-center p-3 gap-3 h-20"
                                : "h-62.5"}`, children: [note.coverImage && (_jsx("div", { className: `${view === "list" ? "w-16 h-14 rounded-lg" : "w-full h-24"} shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-850`, children: _jsx("img", { src: note.coverImage, alt: note.title, className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "flex-1 min-w-0 p-3 flex flex-col justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "flex items-start justify-between gap-1", children: _jsx("h3", { className: "text-xs font-bold text-slate-900 dark:text-white truncate flex-1", children: note.title }) }), _jsx("p", { className: "text-slate-700 dark:text-slate-200 text-[11px] leading-normal line-clamp-2", children: note.content })] }), _jsxs("div", { className: "space-y-2 pt-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-sm", children: note.category }), _jsxs("div", { className: "flex items-center gap-1.5 text-slate-400 dark:text-slate-500", children: [_jsx("button", { onClick: () => handleEdit(note.id), title: "Edit Note", className: "hover:text-blue-500 dark:hover:text-blue-400 p-0.5 rounded transition", children: _jsx(Pencil, { size: 12 }) }), _jsx("button", { onClick: () => setActiveDeleteTarget({ id: note.id, title: note.title }), title: "Delete Note", className: "hover:text-red-500 dark:hover:text-red-400 p-0.5 rounded transition", children: _jsx(Trash2, { size: 12 }) })] })] }), _jsx("div", { className: "flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-1.5 shrink-0", children: _jsx("span", { className: "text-[9px] text-slate-400 font-medium", children: note.date }) })] })] })] }, note.id))) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-2 py-4", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(1, prev - 1)), disabled: page === 1, className: "px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["Page ", page, " of ", totalPages] }), _jsx("button", { onClick: () => setPage((prev) => Math.min(totalPages, prev + 1)), disabled: page === totalPages, className: "px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" })] }))] })), _jsx(DeleteConfirmModal, { isOpen: activeDeleteTarget !== null, onClose: () => setActiveDeleteTarget(null), onConfirm: executeDelete, noteTitle: activeDeleteTarget?.title || "" }), editModalOpen && editNote && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4", children: _jsxs("div", { className: "w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-900/10", children: [_jsxs("div", { className: "flex flex-col gap-3 border-b border-slate-200 dark:border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Edit Note" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Update note details and save changes." })] }), _jsx("button", { type: "button", onClick: () => setEditModalOpen(false), className: "rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition", children: "Close" })] }), _jsxs("div", { className: "space-y-6 p-6 overflow-y-auto max-h-[70vh]", children: [_jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("label", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: ["Title", _jsx("input", { type: "text", value: editNote.title, onChange: (e) => handleEditInputChange("title", e.target.value), className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" })] }), _jsxs("label", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: ["Category", _jsx("select", { value: editNote.category, onChange: (e) => handleEditInputChange("category", e.target.value), className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100", children: categoriesList.map((cat) => (_jsx("option", { value: cat, children: cat }, cat))) })] })] }), _jsxs("label", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: ["Description", _jsx("input", { type: "text", value: editNote.description, onChange: (e) => handleEditInputChange("description", e.target.value), className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" })] }), _jsxs("label", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: ["Content", _jsx("textarea", { value: editNote.content, onChange: (e) => handleEditInputChange("content", e.target.value), rows: 6, className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" })] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("label", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: ["Cover Image", _jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                        if (e.target.files?.[0]) {
                                                            handleEditInputChange("coverImage", e.target.files[0]);
                                                        }
                                                    }, className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" })] }), _jsxs("div", { className: "space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300", children: [_jsx("span", { children: "Tags" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    handleEditTagAdd(tagInput);
                                                                }
                                                            }, className: "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100" }), _jsx("button", { type: "button", onClick: () => handleEditTagAdd(tagInput), className: "rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition", children: "Add" })] }), _jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: editNote.tags.map((tag, idx) => (_jsxs("button", { type: "button", onClick: () => handleEditTagRemove(idx), className: "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200", children: [tag, _jsx("span", { className: "text-slate-400", children: "\u00D7" })] }, idx))) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950", children: [_jsxs("label", { className: "flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: editNote.featured, onChange: (e) => handleEditInputChange("featured", e.target.checked), className: "h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900" }), "Featured"] }), _jsxs("label", { className: "flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: editNote.aiGenerated, onChange: (e) => handleEditInputChange("aiGenerated", e.target.checked), className: "h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900" }), "AI Generated"] })] }), _jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end", children: [_jsx("button", { type: "button", onClick: () => setEditModalOpen(false), className: "rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200", children: "Cancel" }), _jsx("button", { type: "button", onClick: submitEdit, disabled: isSaving, className: "rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50", children: isSaving ? "Saving..." : "Save Changes" })] })] })] }) }))] }));
};
export default MyNotes;
