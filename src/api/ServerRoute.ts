import { Note } from "../pages/Explore/ExploreDetails.js";

const API = import.meta.env.VITE_API_URL || "https://notepilot-backend.vercel.app/api";

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
  const url = userId ? `${API}/my-notes/${userId}` : `${API}/my-notes`;

  const res = await fetch(url, {
    credentials: "include",
  });
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
  const url = new URL(
    userId
      ? `${API}/my-notes/${encodeURIComponent(userId)}`
      : `${API}/my-notes`,
  );

  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));

  if (search.trim()) {
    url.searchParams.append("search", search.trim());
  }

  if (sort) {
    url.searchParams.append("sort", sort);
  }

  const res = await fetch(url.toString(), {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user notes: ${res.status}`);
  }

  return res.json();
};

export const getAllNotesDetails = async (id: string) => {
  const url = `${API}/all-notes/${id}`;

  console.log("Fetching detail:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log("Detail response:", data);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch note details");
  }

  return data;
};
export const Notesfavorited = async (data: {
  isFavoritedData: Date;
  isFavorited: boolean;
  note: Note | null;
  user: any;
}) => {
  const res = await fetch(`${API}/favorited`, {
    method: "POST",
    credentials: "include",
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
    credentials: "include",
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
    credentials: "include",
  });

  return res.json();
};

export const notePost = async (body: Note) => {
  const res = await fetch(`${API}/all-notes`, {
    method: "POST",
    credentials: "include",
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
    credentials: "include",
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

export const getUsersFavorite = async () => {
  const res = await fetch(`${API}/favorited`, {
    credentials: "include",
  });

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
