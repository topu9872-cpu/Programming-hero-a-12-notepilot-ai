import { Note } from "../pages/Explore/ExploreDetails";

const API = import.meta.env.VITE_API_URL;

export interface NotesRequestOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export const getAllNotes = async ({
  page = 1,
  limit = 8,
  search = "",
  sort = "newest",
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

export const getMyNotes = async (
  userId: string,
  {
    page = 1,
    limit = 8,
    search = "",
    sort = "newest",
  }: MyNotesRequestOptions = {},
): Promise<MyNotesResponse> => {
  const url = new URL(`${API}/my-notes/${encodeURIComponent(userId)}`);

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

export const getUsersFavorite = async (id: string) => {
  const res = await fetch(`${API}/favorited/${id}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};
