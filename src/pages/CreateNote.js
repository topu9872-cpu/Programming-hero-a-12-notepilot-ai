import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { RiSaveLine, RiSendPlaneLine, RiPriceTag3Line, RiFolderOpenLine, RiTimeLine, RiImageLine, RiLayoutGridLine, RiDatabaseLine, } from "react-icons/ri";
import { authClient } from "../lib/auth-client";
import { ImageBBUpload } from "../lib/ImageBBUpload";
import { notePost } from "../api/ServerRoute";
import { toast } from "sonner";
import GeminiAi from "../ui/GeminiAi";
// Extract a base clean state blueprint to safely pass to setFormData on reset
const emptyFormState = {
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
    author: null,
};
export default function CreateNote() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "Programming",
        coverImage: null,
        coverGradient: "from-indigo-500 to-purple-600",
        tags: [],
        readTime: "6 min",
        featured: false,
        aiGenerated: false,
        status: "Draft",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        publishedAt: "",
        views: 0,
        author: null,
    });
    const [tagInput, setTagInput] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(`Draft state synced: ${formData.updatedAt}`);
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
        const words = formData.content.trim() === ""
            ? 0
            : formData.content.trim().split(/\s+/).length;
        return {
            wordCount: words,
            charCount: formData.content.length,
            readTime: `${Math.max(1, Math.ceil(words / 225))} min`,
        };
    }, [formData.content]);
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
            updatedAt: new Date().toISOString().split("T")[0],
        }));
    };
    const handleAIClassification = (data) => {
        setFormData((prev) => ({
            ...prev,
            category: data.category,
            tags: data.tags,
            updatedAt: new Date().toISOString().split("T")[0],
        }));
        toast.success("AI suggestions applied!");
    };
    const handleTagKeyDown = (e) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const cleanTag = tagInput.trim();
            if (!formData.tags.includes(cleanTag)) {
                handleInputChange("tags", [...formData.tags, cleanTag]);
            }
            setTagInput("");
        }
    };
    const executeSubmit = async (targetStatus) => {
        setIsSaving(true);
        const todayStr = new Date().toISOString().split("T")[0];
        let uploadedImageUrl = formData.coverImage;
        if (formData.coverImage && formData.coverImage instanceof File) {
            try {
                uploadedImageUrl = await ImageBBUpload(formData.coverImage);
            }
            catch (error) {
                console.error("Image upload failed:", error);
                alert("Image upload failed. Submitting without updating cover image.");
            }
        }
        const dynamicAuthor = user
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
            setLastSaved(`Saved successfully at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
            const body = {
                ...formData,
                ...updatedState,
                readTime: metrics.readTime,
            };
            try {
                if (!body.content?.trim() ||
                    !body.title?.trim() ||
                    !body.description.trim()) {
                    toast.warning("Input is required");
                    return;
                }
                const data = await notePost(body);
                if (data.acknowledged) {
                    toast.success("Note created successfully!");
                    // FIXED: passing real default runtime runtime object definition value now instead of a type reference!
                    setFormData(emptyFormState);
                }
                else {
                    toast.error("Something went wrong!");
                }
            }
            catch (err) {
                console.error("Database submission failure:", err);
            }
        }, 50);
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased", children: [_jsxs("header", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `p-1.5 rounded-lg text-white shadow-sm bg-gradient-to-tr ${formData.coverGradient}`, children: _jsx(RiLayoutGridLine, { className: "w-5 h-5" }) }), _jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Structured Note Schema" })] }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Editing structural dataset for your full-stack notes architecture." })] }), _jsxs("div", { className: "flex items-center gap-3 self-end sm:self-auto", children: [_jsxs("button", { onClick: () => executeSubmit("Draft"), disabled: isSaving, className: "flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-slate-200 rounded-xl hover:bg-slate-50 dark:bg-white/5 dark:border-slate-800 dark:hover:bg-slate-800 disabled:opacity-50 transition-all shadow-sm", children: [_jsx(RiSaveLine, { className: "w-4 h-4" }), _jsx("span", { children: "Save Draft" })] }), _jsxs("button", { onClick: () => executeSubmit("Published"), disabled: isSaving, className: `flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r ${formData.coverGradient} rounded-xl opacity-90 hover:opacity-100 active:scale-[0.98] disabled:opacity-50 transition-all shadow-md`, children: [_jsx(RiDatabaseLine, { className: "w-4 h-4" }), _jsx("span", { children: "Submit to Database" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-10 gap-8 items-start", children: [_jsx("main", { className: "lg:col-span-7 space-y-6", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-6", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("input", { type: "text", placeholder: "Title your note Schema...", value: formData.title, onChange: (e) => handleInputChange("title", e.target.value), className: "w-full text-2xl sm:text-3xl font-bold bg-transparent border-0 focus:ring-0 py-1 focus:outline-none placeholder-slate-300 dark:placeholder-slate-700" }), _jsx("input", { type: "text", placeholder: "Add structural description...", value: formData.description, onChange: (e) => handleInputChange("description", e.target.value), className: "w-full text-sm bg-transparent border-0 text-slate-500 dark:text-slate-400 focus:ring-0 focus:outline-none placeholder-slate-300 dark:placeholder-slate-700" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between py-1.5 px-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs", children: [_jsx("span", { className: "font-mono", children: "Payload property: \"content\"" }), _jsxs("span", { className: "text-slate-400 font-medium", children: ["Read time estimate: ", metrics.readTime] })] }), _jsx("textarea", { placeholder: "Write target document layout body contents...", value: formData.content, onChange: (e) => handleInputChange("content", e.target.value), rows: 10, className: "w-full bg-transparent border-0 focus:ring-0 resize-y focus:outline-none text-base leading-relaxed min-h-[200px] placeholder-slate-400 dark:placeholder-slate-600" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-150 dark:border-slate-850", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsxs("label", { className: "flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: [_jsx(RiFolderOpenLine, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Category" })] }), _jsxs("div", { className: "relative", children: [_jsx("select", { value: formData.category, onChange: (e) => handleInputChange("category", e.target.value), className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none cursor-pointer text-slate-900 dark:text-slate-100 shadow-sm appearance-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500", children: categoriesList.map((cat) => (_jsx("option", { value: cat, className: "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-2", children: cat }, cat))) }), _jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400", children: _jsx("svg", { className: "fill-current h-4 w-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: _jsx("path", { d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" }) }) })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("label", { className: "flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: [_jsx(RiImageLine, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Cover Image Link" })] }), _jsx("input", { type: "file", onChange: (e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            handleInputChange("coverImage", e.target.files[0]);
                                                        }
                                                    }, className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none font-mono text-xs text-slate-500" })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("label", { className: "flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400", children: [_jsx(RiPriceTag3Line, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Tags Structure" })] }), _jsx("input", { type: "text", placeholder: "Add tag + Enter", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: handleTagKeyDown, className: "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl focus:outline-none" })] })] }), formData.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-indigo-50/10", children: formData.tags.map((tag, idx) => (_jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30", children: [tag, _jsx("button", { type: "button", onClick: () => handleInputChange("tags", formData.tags.filter((_, i) => i !== idx)), className: "hover:text-red-500 ml-1 font-bold", children: "\u00D7" })] }, idx))) })), _jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-850", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: formData.featured, onChange: (e) => handleInputChange("featured", e.target.checked), className: "rounded text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 w-4 h-4" }), _jsx("div", { className: "flex flex-col", children: _jsx("span", { className: "text-xs font-medium", children: "Featured Post" }) })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: formData.aiGenerated, onChange: (e) => handleInputChange("aiGenerated", e.target.checked), className: "rounded text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 w-4 h-4" }), _jsx("div", { className: "flex flex-col", children: _jsx("span", { className: "text-xs font-medium", children: "AI Assisted Content" }) })] })] }), _jsx("div", { className: "pt-4 border-t border-slate-250 dark:border-slate-800 flex items-center justify-end gap-3", children: _jsxs("button", { type: "button", onClick: () => executeSubmit("Published"), disabled: isSaving, className: `w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm text-white bg-gradient-to-r ${formData.coverGradient} rounded-xl shadow-md hover:opacity-95 transition-all`, children: [_jsx(RiSendPlaneLine, { className: "w-4 h-4" }), _jsx("span", { children: "Submit and Sync Document" })] }) })] }) }), _jsx("aside", { className: "lg:col-span-3 space-y-4 lg:sticky lg:top-6", children: _jsx(GeminiAi, { title: formData.title, content: formData.content, onApplyClassification: handleAIClassification }) })] }), _jsxs("footer", { className: "mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xs text-xs text-slate-500 dark:text-slate-400 font-mono", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2", children: [_jsxs("div", { children: ["WORDS:", " ", _jsx("span", { className: "font-semibold text-slate-700 dark:text-slate-300", children: metrics.wordCount })] }), _jsxs("div", { children: ["CHARS:", " ", _jsx("span", { className: "font-semibold text-slate-700 dark:text-slate-300", children: metrics.charCount })] }), _jsxs("div", { children: ["STATUS:", " ", _jsx("span", { className: "font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300", children: formData.status })] }), _jsxs("div", { className: "flex items-center gap-1 text-slate-400", children: [_jsx(RiTimeLine, { className: "w-3.5 h-3.5" }), " ", _jsxs("span", { children: ["UPDATED: ", formData.updatedAt] })] })] }), _jsxs("div", { className: "flex items-center gap-2 bg-slate-50 dark:bg-slate-950 py-1 px-2.5 rounded-lg border border-slate-100 dark:border-slate-850", children: [_jsx("div", { className: `h-1.5 w-1.5 rounded-full ${isSaving ? "bg-amber-400 animate-ping" : "bg-indigo-500"}` }), _jsx("span", { className: "text-[11px] text-slate-600 dark:text-slate-400", children: isSaving ? "Syncing active data model..." : lastSaved })] })] })] }));
}
