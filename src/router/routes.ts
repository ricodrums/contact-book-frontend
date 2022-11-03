import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('src/pages/public/Index.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/public/auth/Login.vue') },
      { path: 'register', name: 'register', component: () => import('src/pages/public/auth/Register.vue') },
      { path: 'about', name: 'about', component: () => import('src/pages/public/AboutUs.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/public/errors/NotFound.vue'),
  },
];

export default routes;
