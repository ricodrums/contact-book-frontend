import { defineStore } from 'pinia';
import { KEYS_STORAGE } from 'src/constants';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authorization: false,
    accessToken: '',
    typeToken: '',
    refreshToken: '',
  }),

  getters: {
    getAuth: ({ authorization }) => authorization,
    getToken: ({ accessToken }) => accessToken,
    getTypeToken: ({ typeToken }) => typeToken,
  },

  actions: {
    setAuth(accessToken: string, typeToken: string, refreshToken: string) {
      this.authorization = true;
      this.accessToken = accessToken;
      this.typeToken = typeToken;
      this.refreshToken = refreshToken;
      if (!localStorage.getItem(KEYS_STORAGE.AUTHORIZATION))
        localStorage.setItem(
          KEYS_STORAGE.AUTHORIZATION,
          JSON.stringify({ accessToken, typeToken, refreshToken })
        );
    },
    
    removeAuth() {
      this.authorization = false;
      this.accessToken = '';
      this.typeToken = '';
      this.refreshToken = '';
      localStorage.removeItem(KEYS_STORAGE.AUTHORIZATION);
    },
  },
});
