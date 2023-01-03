import type { NoteEditDataT, NoteT, NoteStoreT } from "index";
import { getNotesFromStorage, storeNotes } from ".";

export const findAndEditNote =
  ({ id, title, detail }: NoteEditDataT) =>
    (note: NoteT) =>
      note.id === id
        ? {
          ...note,
          title,
          detail,
          updatedAt: new Date().toLocaleString(),
        }
        : note;

export const findAndSetDone = (id: string) => (note: NoteT) =>
  note.id === id
    ? {
      ...note,
      isDone: !note.isDone,
      updatedAt: new Date().toLocaleString(),
    }
    : note;

export const createAddNote = (noteStore: NoteStoreT) => (note: NoteT) => {
  noteStore.notes.push(note)
  storeNotes(noteStore.notes)
}

export const createClearNotes = (noteStore: NoteStoreT) => () => {
  noteStore.notes = []
  storeNotes(noteStore.notes)
}

export const createEditNote = (noteStore: NoteStoreT) => (newData: NoteEditDataT) => {
  noteStore.notes = noteStore.notes.map(findAndEditNote(newData))
  storeNotes(noteStore.notes)
}

export const createDeleteNote = (noteStore: NoteStoreT) => (id: string) => {
  noteStore.notes = noteStore.notes.filter((note) => note.id !== id)
  storeNotes(noteStore.notes)
}

export const createToggleDone = (noteStore: NoteStoreT) => (id: string) => {
   noteStore.notes = noteStore.notes.map(findAndSetDone(id));
  storeNotes(noteStore.notes)
}
