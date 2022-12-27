<script setup lang="ts">
import type { NoteT } from "index";
import NoteInputDialog from "./NoteInputDialog.vue";
defineProps<{
  note: NoteT;
  toggleDone: (id: string) => void;
  deleteNote: (id: string) => void;
  editNote: (id: string, title: string, detail?: string) => void;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    styleNote() {
      return this.note.isDone
        ? { outline: "none", color: "#41b883" }
        : undefined;
    },
  },
  methods: {
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
  },
};
</script>

<template>
  <div class="container" :style="styleNote">
    <NoteInputDialog
      :noteId="note.id"
      :noteTitle="note.title"
      :noteDetail="note.detail"
      :showDialog="showDialog"
      :editNote="editNote"
      :toggleShowDialog="toggleShowDialog"
    />
    <details>
      <div class="note-detail">
        {{ note.detail }}
      </div>

      <summary>
        {{ note.title }}
      </summary>

      <div class="note-time">
        <div>
          <small>CreatedAt: {{ note.createdAt }}</small>
        </div>
        <div>
          <small>UpdatedAt: {{ note.updatedAt }}</small>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="toggleShowDialog" class="edit-button">Edit</button
        ><button @click="deleteNote(note.id)" class="delete-button">
          Delete</button
        ><button
          v-show="note.isDone"
          @click="toggleDone(note.id)"
          class="done-button"
        >
          Pend
        </button>
        <button
          v-show="!note.isDone"
          @click="toggleDone(note.id)"
          class="done-button"
        >
          Done
        </button>
      </div>
    </details>
  </div>
</template>

<style scoped lang="css">
.container {
  max-width: 20rem;
  outline: 1px solid #1b1d1b;
  padding: 1rem;
  margin-top: 2rem;
  cursor: pointer;
}
.action-buttons {
  text-align: center;
}
.action-buttons {
  display: flex;
  justify-content: end;
}
.note-time {
  margin-top: 1rem;
  border-bottom: 1px solid gray;
}
.action-buttons > button {
  width: 4rem;
  color: white;
}
.edit-button {
  background-color: #34495e;
}
.delete-button {
  background-color: crimson;
}
.done-button {
  background-color: #41b883;
}
small {
  font-size: x-small;
}
.note-detail {
  font-size: small;
}
</style>
