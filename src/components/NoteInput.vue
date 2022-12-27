<script setup lang="ts">
import type { NoteT } from "index";

defineProps<{
  addNote: (Note: NoteT) => void;
  clearNotes: () => void;
  hasNotes: boolean;
}>();
</script>
<script lang="ts">
export default {
  data() {
    return {
      showDialog: false,
      title: "",
      detail: "",
    };
  },
  methods: {
    toggleShowDialog() {
      this.showDialog = !this.showDialog;
    },
    handleSubmit() {
      const createdAt = new Date().toLocaleString();
      this.addNote({
        createdAt,
        updatedAt: createdAt,
        isDone: false,
        title: this.title,
        detail: this.detail,
        id: Date.now() + "",
      });
      this.title = this.detail = "";
      this.toggleShowDialog();
    },
  },
};
</script>

<template>
  <div class="container">
    <div v-show="showDialog" class="dialog-backdrop">
      <dialog open>
        <div class="dialog-header">
          <div>Add Note</div>
          <div
            @click="toggleShowDialog()"
            title="close dialog"
            class="dialog-close"
          >
            X
          </div>
        </div>
        <div class="dialog-body">
          <div>
            <input
              name="title"
              v-model="title"
              type="text"
              placeholder="Note title..."
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
        <button @click="handleSubmit">Submit</button>
      </dialog>
    </div>

    <div>
      <button @click="toggleShowDialog()">Add Note</button>
      <button @click="clearNotes" v-show="hasNotes" class="clear-button">
        Clear All
      </button>
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
dialog {
  border: none;
  margin: 0 auto;
  z-index: 3;
}
dialog > button {
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
.dialog-body > div {
  margin: 0.4rem;
}
.dialog-backdrop {
  background-color: rgba(10, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
}
.clear-button {
  background-color: crimson;
  color: white;
}
input,
textarea {
  border: none;
  width: 100%;
}
.dialog-body {
  text-align: start;
}
</style>
