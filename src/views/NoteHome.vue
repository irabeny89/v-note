<script setup lang="ts">
import Note from "@/components/Note.vue";
import useToggle from "@/hooks/useToggle";
import useNoteStore from "@/stores/useNoteStore";
import { computed, defineAsyncComponent } from "vue";

const NoteInput = defineAsyncComponent(
  () => import("@/components/NoteInput.vue")
);

const { noteStore, clearNotes } = useNoteStore();

const { showDialog, toggleShowDialog } = useToggle();

const notesCount = computed(() => noteStore.notes.length);
const doneNotesCount = computed(
  () => noteStore.notes.filter((note) => note.isDone).length
);
const pendingNotesCount = computed(
  () => notesCount.value - doneNotesCount.value
);
// sort undone notes first
const sortedNotes = computed(() =>
  noteStore.notes.sort((a, b) => Number(a.isDone) - Number(b.isDone))
);
</script>

<template>
  <main>
    <div class="note-stats">
      <div>Notes: {{ noteStore.notes.length }}</div>
      <div>Done: {{ doneNotesCount }}</div>
      <div>Pending: {{ pendingNotesCount }}</div>
    </div>

    <NoteInput :showDialog="showDialog" :toggleShowDialog="toggleShowDialog" />

    <div class="action-buttons">
      <button @click="toggleShowDialog">Add Note</button>
      <button @click="clearNotes" v-show="!!notesCount" class="clear-button">
        Clear All
      </button>
    </div>

    <div class="notes">
      <div v-for="note in sortedNotes">
        <Note :key="note.id" v-bind="note" />
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
main {
  margin: 0 0 10rem;
}
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
