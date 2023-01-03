<script setup lang="ts">
import useToggle from "@/hooks/useToggle";
import useNoteStore from "@/stores/useNoteStore";
import { defineAsyncComponent } from "vue";

const NoteInput = defineAsyncComponent(
  () => import("@/components/NoteInput.vue")
);


const { createdAt, id, isDone, title, updatedAt, detail } = defineProps<{
  id: string;
  title: string;
  detail?: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}>();

const { deleteNote, toggleDone } = useNoteStore();

const { showDialog, toggleShowDialog } = useToggle();
</script>

<template>
  <div
    class="container"
    :style="isDone ? { outline: 'none', color: '#41b883' } : undefined"
  >
    <NoteInput
      :edit="{ id, detail, title }"
      :showDialog="showDialog"
      :toggleShowDialog="toggleShowDialog"
    />
    <details>
      <div class="note-detail">
        {{ detail }}
      </div>

      <summary>
        {{ title }}
      </summary>

      <div class="note-time">
        <div>
          <small>CreatedAt: {{ createdAt }}</small>
        </div>
        <div>
          <small>UpdatedAt: {{ updatedAt }}</small>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="toggleShowDialog" class="edit-button">Edit</button>
        <button @click="deleteNote(id)" class="delete-button">Delete</button>
        <button v-show="isDone" @click="toggleDone(id)" class="done-button">
          Pend
        </button>
        <button v-show="!isDone" @click="toggleDone(id)" class="done-button">
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
