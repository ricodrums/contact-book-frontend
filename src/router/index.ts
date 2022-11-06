import { route } from 'quasar/wrappers';
import { KEYS_STORAGE, ROUTER } from 'src/constants';
import { useAuthStore } from 'src/stores/auth.store';
import { hideLoading, showLoading } from 'src/utils/loading';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

  const authStore = useAuthStore();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach(async (to, from) => {
    showLoading();
    if (
      // make sure the user is authenticated
      !localStorage.getItem(KEYS_STORAGE.AUTHORIZATION) &&
      // Avoid infinite redirection
      to.name !== ROUTER.LOGIN &&
      // Allow public pages
      !to.meta.isPublic
    ) {
      hideLoading();
      // redirect the user to the login page
      return { name: ROUTER.LOGIN }
    }
    hideLoading();
  })
  return router;
});
