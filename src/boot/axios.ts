import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth.store';
import { logout, refreshToken } from 'src/services/auth.service';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080/v1' });

const authStore = useAuthStore();

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (authStore.isAuthenticated)
      config.headers[
        'Authorization'
      ] = `${authStore.getTypeToken}${authStore.getToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (reject) => {
    const { config, response } = reject;
    if (response.status !== 401 && response.status !== 403)
      return Promise.reject(reject);

    if (config._retry || response.status === 403) {
      await logout();
      return Promise.reject(reject);
    }

    config._retry = true;
    const token = await refreshToken();
    config.headers = { ...config.headers, Authorization: token };
    return api(config);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
