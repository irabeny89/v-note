<script setup lang="ts">
import Note from "../components/Note.vue";
import type { NoteT } from "index";
import { NOTES_KEY } from "@/config";
import NoteInputDialog from "@/components/NoteInputDialog.vue";
</script>
<script lang="ts">
const getNotesFromStorage = (localStorage: Storage) => {
  const string_notes = localStorage.getItem(NOTES_KEY);
  return string_notes ? (JSON.parse(string_notes) as NoteT[]) : [];
};

export default {
  data(): {
    notes: NoteT[];
    showDialog: boolean;
  } {
    return {
      notes: [],
      showDialog: false,
    };
  },
  computed: {
    sortedNotes() {
      return this.notes.sort((a, b) => Number(a.isDone) - Number(b.isDone));
    },
    notesCount() {
      return this.sortedNotes.length;
    },
    doneNotesCount() {
      return this.sortedNotes.filter((note) => note.isDone).length;
    },
    pendingNotes() {
      return this.sortedNotes.length - this.doneNotesCount;
    },
  },
  methods: {
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
    addNote(note: NoteT) {
      this.notes.push(note);
      localStorage.setItem(NOTES_KEY, JSON.stringify(this.notes));
    },
    clearNotes() {
      localStorage.removeItem(NOTES_KEY);
      this.notes = [];
    },
    toggleDone(id: string) {
      this.notes = this.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              isDone: !note.isDone,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      );
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter((note) => note.id !== id);
      localStorage.setItem(NOTES_KEY, JSON.stringify(this.notes));
    },
    editNote(id: string, title: string, detail?: string) {
      this.notes = this.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              detail,
              updatedAt: new Date().toLocaleString(),
            }
          : note
      );
    },
  },
  mounted() {
    this.notes = getNotesFromStorage(localStorage);
  },
  components: { NoteInputDialog },
};
</script>

<template>
  <main>
    <div class="note-stats">
      <div>Notes: {{ notesCount }}</div>
      <div>Done: {{ doneNotesCount }}</div>
      <div>Pending: {{ pendingNotes }}</div>
    </div>

    <NoteInputDialog
      :addNote="addNote"
      :showDialog="showDialog"
      :toggleShowDialog="toggleShowDialog"
    />

    <div class="action-buttons">
      <button @click="toggleShowDialog()">Add Note</button>
      <button @click="clearNotes" v-show="!!notesCount" class="clear-button">
        Clear All
      </button>
    </div>

    <div class="notes">
      <div v-for="note in sortedNotes">
        <Note
          :key="note.id"
          :note="note"
          :toggleDone="toggleDone"
          :deleteNote="deleteNote"
          :editNote="editNote"
        />
      </div>
    </div>

    <div v-show="!notesCount" class="list-placeholder">
      Add new note with &apos;Add Note&apos; button above &uparrow;
    </div>
  </main>
</template>

<style lang="css">
button {
  font-weight: 600;
  cursor: pointer;
  border: none;
}
input:focus,
textarea:focus {
  outline: none;
}
</style>

<style scoped lang="css">
.list-placeholder {
  text-align: center;
  margin-top: 2rem;
}
.notes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.notes > div {
  width: 18rem;
}
.note-stats {
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
}
.action-buttons {
  margin-top: 3rem;
  text-align: center;
}
.clear-button {
  background-color: crimson;
  color: white;
}
</style>
