import { createRouter, createWebHistory } from 'vue-router'

import MainComponent from '@/components/index.vue';

const routes = [
  { path: '/', component: MainComponent }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
