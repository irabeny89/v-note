import { NOTES_KEY } from "@/config";
import type { NoteT } from "index";

export const storeNotes = (notes: NoteT[]) =>
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

export const getNotesFromStorage = (localStorage: Storage) => {
  const string_notes = localStorage.getItem(NOTES_KEY);
  return string_notes ? (JSON.parse(string_notes) as NoteT[]) : [];
};
