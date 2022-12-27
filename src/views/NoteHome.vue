<script lang="ts">
import { reactive, computed } from "vue";
import Note from "@/components/Note.vue";
import type { NoteT } from "index";
import NoteInputDialog from "@/components/NoteInputDialog.vue";
import useToggle from "@/hooks/useToggle";
import {
  addNoteFn,
  clearNotesFn,
  deleteNoteFn,
  editNoteFn,
  getDoneNote,
  getNotesFromStorage,
  sortUndoneFirst,
  toggleDoneFn,
} from "@/utils/homeUtils";

export default {
  setup() {
    const notesData = reactive<Record<"notes", NoteT[]>>({
      notes: getNotesFromStorage(localStorage),
    });

    const sortedNotes = computed(() =>
      [...notesData.notes].sort(sortUndoneFirst)
    );
    const notesCount = computed(() => notesData.notes.length);
    const doneNotesCount = computed(
      () => notesData.notes.filter(getDoneNote).length
    );
    const pendingNotes = computed(
      () => notesCount.value - doneNotesCount.value
    );

    return {
      ...useToggle(),
      sortedNotes,
      notesCount,
      doneNotesCount,
      pendingNotes,
      addNote: addNoteFn(notesData),
      clearNotes: clearNotesFn(notesData),
      toggleDone: toggleDoneFn(notesData),
      deleteNote: deleteNoteFn(notesData),
      editNote: editNoteFn(notesData),
    };
  },
  components: { Note, NoteInputDialog },
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
