const API = import.meta.env.VITE_API_URL;
export const getAllNotes = async ({ page = 1, limit = 8, search = "", sort = "newest", } = {}) => {
    const url = new URL(`${API}/all-notes`);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));
    if (search.trim()) {
        url.searchParams.append("search", search.trim());
    }
    if (sort) {
        url.searchParams.append("sort", sort);
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
    }
    return res.json();
};
export const getDashboardNotes = async (userId) => {
    const url = userId
        ? `${API}/my-notes/${userId}`
        : `${API}/my-notes`;
    const res = await fetch(url);
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
};
export const getMyNotes = async (userId, { page = 1, limit = 8, search = "", sort = "newest", } = {}) => {
    const url = new URL(userId
        ? `${API}/my-notes/${encodeURIComponent(userId)}`
        : `${API}/my-notes`);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));
    if (search.trim()) {
        url.searchParams.append("search", search.trim());
    }
    if (sort) {
        url.searchParams.append("sort", sort);
    }
    const res = await fetch(url.toString());
    if (!res.ok) {
        throw new Error(`Failed to fetch user notes: ${res.status}`);
    }
    return res.json();
};
export const getAllNotesDetails = async (id) => {
    // Adding cache: 'no-store' instructs the browser to bypass its cache
    // and fetch fresh data from the server every single time.
    const res = await fetch(`${API}/all-notes/${id}`, {
        cache: "no-store",
        headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch notes");
    }
    return res.json();
};
export const Notesfavorited = async (data) => {
    const res = await fetch(`${API}/favorited`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
};
export const removeFavorite = async (noteId, userId) => {
    const res = await fetch(`${API}/favorited`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            noteId,
            userId,
        }),
    });
    return res.json();
};
export const deleteNote = async (id) => {
    const res = await fetch(`${API}/delete-student-notes/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
export const notePost = async (body) => {
    const res = await fetch(`${API}/all-notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
};
export const updateNote = async (noteId, body) => {
    const res = await fetch(`${API}/all-notes/${encodeURIComponent(noteId)}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const result = await res.json();
    if (!res.ok) {
        throw new Error(result.message || "Failed to update note");
    }
    return result;
};
export const getUsersFavorite = async (id) => {
    const res = await fetch(`${API}/favorited/${id}`);
    if (!res.ok) {
        throw new Error("Something went wrong");
    }
    return res.json();
};
export const generateSummary = async (title, content) => {
    const res = await fetch(`${API}/api/ai/summary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to generate summary");
    }
    return res.json();
};
export const classifyNote = async (title, content) => {
    const res = await fetch(`${API}/api/ai/classify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to classify note");
    }
    return res.json();
};
