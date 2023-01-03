import { getNotesFromStorage } from "@/utils";
import {
  createAddNote,
  createClearNotes,
  createEditNote,
  createDeleteNote,
  createToggleDone,
} from "@/utils/useNoteStoreUtils";
import type { NoteStoreT } from "index";
import { defineStore } from "pinia";
import { reactive } from "vue";

const useNoteStore = defineStore("noteStore", () => {
  const noteStore = reactive<NoteStoreT>({ notes: getNotesFromStorage(localStorage) })

  return {
    noteStore,
    addNote: createAddNote(noteStore),
    clearNotes: createClearNotes(noteStore), editNote: createEditNote(noteStore),
    deleteNote: createDeleteNote(noteStore),
    toggleDone: createToggleDone(noteStore)
  }
})
export default useNoteStore