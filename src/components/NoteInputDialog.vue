<script setup lang="ts">
import type { NoteT } from "index";

defineProps<{
  showDialog: boolean;
  noteId?: string;
  noteTitle?: string;
  noteDetail?: string;
  toggleShowDialog: () => void;
  addNote?: (Note: NoteT) => void;
  editNote?: (id: string, title: string, detail?: string) => void;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      title: this.noteTitle ?? "",
      detail: this.noteDetail ?? "",
    };
  },
  methods: {
    handleSubmit(e: Event) {
      e.preventDefault();
      const currentDateTime = new Date().toLocaleString();
      if (this.title) {
        this.addNote &&
          this.addNote({
            createdAt: currentDateTime,
            updatedAt: currentDateTime,
            isDone: false,
            title: this.title,
            detail: this.detail,
            id: Date.now() + "",
          });
        this.editNote &&
          this.noteId &&
          this.editNote(this.noteId, this.title, this.detail);
        this.title = this.detail = "";
        this.toggleShowDialog();
      }
    },
  },
};
</script>

<template>
  <div
    v-show="showDialog"
    @click="toggleShowDialog"
    class="dialog-backdrop"
  ></div>
  <dialog :open="showDialog">
    <div class="dialog-header">
      <h3 v-if="noteId">Edit Note</h3>
      <h3 v-else-if="!noteId">Add Note</h3>
      <div
        @click="toggleShowDialog()"
        title="close dialog"
        class="dialog-close"
        aria-label="close modal"
      >
        X
      </div>
    </div>
    <form @submit="handleSubmit">
      <div class="dialog-body">
        <div>
          <input
            required
            autofocus
            name="title"
            v-model="title"
            type="text"
            placeholder="Note title..."
            class="title-input"
          />
        </div>
        <div>
          <textarea
            name="detail"
            v-model="detail"
            placeholder="Optional details..."
            cols="30"
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </dialog>
</template>

<style scoped lang="css">
input,
textarea {
  border: none;
  width: 100%;
}
dialog {
  width: 90vw;
  position: fixed;
  top: 10.5rem;
  left: 5vw;
  border: none;
  z-index: 1;
}
form > button {
  background-color: #41b883;
  color: white;
  width: 100%;
  padding: 0.4rem 0;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-left: 0.2rem;
  background-color: rgb(231, 229, 229);
}
.dialog-close {
  background-color: crimson;
  color: white;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
}
.dialog-body {
  text-align: start;
}
.dialog-body > div {
  margin: 0.4rem;
}
.dialog-backdrop {
  background-color: rgba(10, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
@media (min-width: 768px) {
  dialog {
    width: 50vw;
    position: fixed;
    top: 10rem;
    left: 25vw;
    border: none;
    z-index: 1;
  }
}
</style>
