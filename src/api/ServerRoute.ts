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

export const getAllNotesDetails = async (id: string) => {
  const res = await fetch(`${API}/all-notes/${id}`);

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
  console.log(data)
  const res=await fetch(`${API}/favorited`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
   if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
};