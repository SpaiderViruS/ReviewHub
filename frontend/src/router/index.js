import { createRouter, createWebHistory } from 'vue-router'

import { useUser } from '@/components/store/userStore'

import MainComponent from '@/components/index.vue';
import catalog from '@/components/views/catalog.vue';
import authorization from '@/components/views/authorization.vue';
import registration from '@/components/views/registration.vue';
import itemMain from '@/components/views/itemView/itemMain.vue';

// Footer Components
import aboutProject from '@/components/views/footerViews/aboutProject.vue';
import privacyPolicy from '@/components/views/footerViews/privacyPolicy.vue';

// Admin Components
import adminUsers from '@/components/views/adminViews/adminUsers.vue';
import addItem from '@/components/views/adminViews/addItem.vue';

// 404
import EmptyPage from '@/components/views/emptyPage.vue';

const routes = [
  { path: '/', component: MainComponent },
  { path: '/catalog', component: catalog },
  { path: '/login', component: authorization },
  { path: '/registration', component: registration },
  
  { path: '/item/:id', component: itemMain },
  
  { path: '/about', component: aboutProject },
  { path: '/privacy', component: privacyPolicy },

  {
    path: '/admin',
    meta: { requiresAuth: true },
    children: [
      { path: 'users', component: adminUsers },
      { path: 'add-item', component: addItem }
    ],
  },

  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: EmptyPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const { user } = useUser()

router.beforeEach((to, from, next) => {
  const isAdmin = user?.value?.user_role === 3;
  if (to.meta.requiresAuth && !isAdmin) {
    next('/');
  } else {
    next();
  }
});

export default router
