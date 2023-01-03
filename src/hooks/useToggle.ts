import { ref } from "vue";

export default function useToggle() {
  const showDialog = ref(false)
  
  const toggleShowDialog = () => (showDialog.value = !showDialog.value)
  
  return { showDialog, toggleShowDialog }
}