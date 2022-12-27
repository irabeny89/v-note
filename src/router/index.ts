import { createRouter, createWebHistory } from 'vue-router'
import NoteHome from '../views/NoteHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NoteHome
    },
  ]
})

export default router
