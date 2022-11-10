import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('src/pages/public/IndexView.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/public/auth/LoginForm.vue') },
      { path: 'register', name: 'register', component: () => import('src/pages/public/auth/RegisterForm.vue') },
      { path: 'about', name: 'about', component: () => import('src/pages/public/AboutUs.vue') },
    ],
    meta: { isPublic: true },
  },
  {
    path: '/home',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', name: 'homeIndex', component: () => import('src/pages/home/IndexView.vue') },
    ],
    meta: { isPublic: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/public/errors/NotFound.vue'),
  },
];

export default routes;
