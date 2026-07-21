import { Note } from "../pages/Explore/ExploreDetails.js";

const API = (() => {
  // Prefer VITE_API_URL when provided (production/preview). If not set in production,
  // fall back to the known deployed backend URL so CI/deployments that omit the
  // environment variable still produce a working build. Local development still
  // falls back to http://localhost:5000.
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (apiUrl && apiUrl !== "undefined") return apiUrl;
  if (import.meta.env.MODE === "development") return "http://localhost:5000";
  // Fallback to the deployed backend /api entrypoint to allow non-interactive builds.
  return "https://notepilot-backend.vercel.app/api";
})();

export interface NotesRequestOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  category?: string; // ক্যাটাগরি অপশনাল প্রপার্টি হিসেবে যোগ করা হলো
}

export const getAllNotes = async ({
  page = 1,
  limit = 8,
  search = "",
  sort = "newest",
  category, 
}: NotesRequestOptions = {}) => {
  const url = new URL(`${API}/all-notes`);

  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));

  if (search.trim()) {
    url.searchParams.append("search", search.trim());
  }

  if (sort) {
    url.searchParams.append("sort", sort);
  }

  
  if (category && category.trim()) {
    url.searchParams.append("category", category.trim());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};

export interface MyNotesRequestOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface MyNotesResponse {
  notes: Note[];
  totalNotes: number;
  currentPage: number;
  totalPages: number;
}

export const getDashboardNotes = async (userId?: string) => {
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

export const getMyNotes = async (
  userId: string,
  {
    page = 1,
    limit = 8,
    search = "",
    sort = "newest",
  }: MyNotesRequestOptions = {},
): Promise<MyNotesResponse> => {
  const url = new URL( userId
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

export const getAllNotesDetails = async (id: string) => {
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

export const Notesfavorited = async (data: {
  isFavoritedData: Date;
  isFavorited: boolean;
  note: Note | null;
  user: any;
}) => {
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

export const removeFavorite = async (noteId: string, userId: string) => {
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

export const deleteNote = async (id: string) => {
  const res = await fetch(`${API}/delete-student-notes/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const notePost = async (body: Note) => {
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
export const updateNote = async (noteId: string, body: Partial<Note>) => {
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

export const getUsersFavorite = async (id: string) => {
  const res = await fetch(`${API}/favorited/${id}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

export const generateSummary = async (title: string, content: string) => {
  const res = await fetch(`${API}/ai/summary`, {
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

export const classifyNote = async (title: string, content: string) => {
  const res = await fetch(`${API}/ai/classify`, {
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
