import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authorization: false,
    accessToken: '',
    typeToken: '',
    refreshToken: '',
  }),

  getters: {
    getToken: ({ accessToken }) => accessToken,
    getTypeToken: ({ typeToken }) => typeToken,
    getRefreshToken: ({ refreshToken }) => refreshToken,
    isAuthenticated: ({ authorization }) => authorization ?? false,
  },

  actions: {
    setAuth(accessToken: string, typeToken: string, refreshToken: string) {
      this.authorization = true;
      this.accessToken = accessToken;
      this.typeToken = typeToken;
      this.refreshToken = refreshToken;
    },

    removeAuth() {
      this.authorization = false;
      this.accessToken = '';
      this.typeToken = '';
      this.refreshToken = '';
    },
  },
  persist: true,
});
