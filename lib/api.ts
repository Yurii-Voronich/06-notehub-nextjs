import { Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
interface NoteResp {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  page: number,
  searchqurey?: string
): Promise<NoteResp> {
  const res = await axios.get<NoteResp>("/notes", {
    params: {
      page: page,
      perPage: 12,
      search: searchqurey,
    },
  });
  return res.data;
}
export interface NewNote {
  title: string;
  content: string;
  tag: string;
}
export async function createNote(newNoteData: NewNote) {
  const resp = await axios.post<Note>("/notes", newNoteData);
  return resp.data;
}

export async function deleteNote(id: string) {
  const resp = await axios.delete<Note>(`/notes/${id}`);
  return resp.data;
}

export async function fetchNoteById(id: string) {
  const resp = await axios.get<Note>(`/notes/${id}`);
  return resp.data;
}
