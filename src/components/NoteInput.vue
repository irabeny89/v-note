<script setup lang="ts">
import useNoteStore from "@/stores/useNoteStore";
import type { NoteEditDataT } from "index";
import { reactive } from "vue";

const { showDialog, edit, toggleShowDialog } = defineProps<{
  edit?: NoteEditDataT;
  showDialog: boolean;
  toggleShowDialog: () => void;
}>();

const { addNote, editNote } = useNoteStore();

const inputData = reactive({
  title: edit?.title ?? "",
  detail: edit?.detail ?? "",
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (edit) {
    editNote({ ...edit, ...inputData });
  } else {
    const currentDateTime = new Date().toLocaleString();
    addNote({
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
      id: Date.now() + "",
      isDone: false,
      ...inputData,
    });

    inputData.title = inputData.detail = "";
  }
  toggleShowDialog();
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
      <h3 v-if="edit">Edit Note</h3>
      <h3 v-else>Add Note</h3>
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
            name="title"
            v-model="inputData.title"
            type="text"
            placeholder="Note title..."
            class="title-input"
          />
        </div>
        <div>
          <textarea
            name="detail"
            v-model="inputData.detail"
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
  padding: 0.2rem 0.6rem;
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
