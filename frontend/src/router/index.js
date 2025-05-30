import { createRouter, createWebHistory } from 'vue-router'

import MainComponent from '@/components/index.vue';
import catalog from '@/components/catalog.vue';

// 404
import EmptyPage from '@/components/emptyPage.vue';

const routes = [
  { path: '/', component: MainComponent },
  { path: '/catalog', component: catalog },

  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: EmptyPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
