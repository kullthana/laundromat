import { createRouter, createWebHistory } from 'vue-router'
import Laundromat from '@/views/Laundromat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Laundromat',
      component: Laundromat
    }
  ]
})

export default router
