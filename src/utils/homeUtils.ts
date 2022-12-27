import { NOTES_KEY } from "@/config";
import type { NoteT, NotesDataT } from "index";

export const storeNotes = (notes: NoteT[]) =>
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

export const getNotesFromStorage = (localStorage: Storage) => {
  const string_notes = localStorage.getItem(NOTES_KEY);
  return string_notes ? (JSON.parse(string_notes) as NoteT[]) : [];
};

export const sortUndoneFirst = (a: NoteT, b: NoteT) =>
  Number(a.isDone) - Number(b.isDone);

export const getDoneNote = (note: NoteT) => note.isDone;

export const findAndSetDone = (id: string) => (note: NoteT) =>
  note.id === id
    ? {
      ...note,
      isDone: !note.isDone,
      updatedAt: new Date().toLocaleString(),
    }
    : note;

export const findAndEditNote =
  (id: string, title: string, detail?: string) => (note: NoteT) =>
    note.id === id
      ? {
        ...note,
        title,
        detail,
        updatedAt: new Date().toLocaleString(),
      }
      : note;

export const addNoteFn = (notesData: NotesDataT) => (note: NoteT) => (
  notesData.notes.push(note), storeNotes(notesData.notes)
)

export const clearNotesFn = (notesData: NotesDataT) => () => {
  localStorage.removeItem(NOTES_KEY);
  notesData.notes = [];
}

export const toggleDoneFn = (notesData: NotesDataT) => (id: string) => {
  notesData.notes = notesData.notes.map(findAndSetDone(id));
  storeNotes(notesData.notes);
}

export const deleteNoteFn = (notesData: NotesDataT) => (id: string) => {
  notesData.notes = notesData.notes.filter((note) => note.id !== id);
  storeNotes(notesData.notes);
}

export const editNoteFn = (notesData: NotesDataT) => (id: string, title: string, detail?: string) => {
  notesData.notes = notesData.notes.map(
    findAndEditNote(id, title, detail)
  );
  storeNotes(notesData.notes);
}
