
const API = import.meta.env.VITE_API_URL;

export const getAllNotes = async () => {


  const res = await fetch(`${API}/all-notes`);

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