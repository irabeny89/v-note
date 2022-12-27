import { ref } from "vue";

const showDialog = ref(false)

const toggleShowDialog = () => (showDialog.value = !showDialog.value)

export default function useToggle() {
  return { showDialog, toggleShowDialog }
}