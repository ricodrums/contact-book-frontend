import { defineStore } from 'pinia';
import { KEYS_STORAGE } from 'src/constants';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    name: '',
    lastname: '',
    username: '',
    email: '',
    photo: '',
    phone: ''
  }),
  getters: {
    getAvatar: ({ photo, name, lastname, username, email }) =>
      photo !== ''
        ? photo
        : name !== '' && lastname !== ''
        ? `${name.charAt(0)}${lastname.charAt(0)}`
        : username !== ''
        ? `${username.charAt(0)}`
        : `${email.charAt(0)}`,
    getPhoto: ({ photo }) => photo,
    showCompleteInfo: ({ name, lastname, email, phone }) =>
      [name, lastname, email, phone].some((e) => e.trim() === ''),
  },
  actions: {
    setProfile(profile: { name?: string, lastname?: string, username?: string, email?: string, photo?: string, phone?: string }) {
      const { name, lastname, username, email, photo, phone } = profile;
      this.name = name ?? '';
      this.lastname = lastname ?? '';
      this.username = username ?? '';
      this.email = email ?? '';
      this.photo = photo ?? '';
      this.phone = phone ?? '';
      if(!localStorage.getItem(KEYS_STORAGE.PROFILE))
          localStorage.setItem(
            KEYS_STORAGE.PROFILE,
            JSON.stringify({ name, lastname, username, email, photo, phone})
          );
    },
    removeProfile() {
      this.name = '';
      this.lastname = '';
      this.username = '';
      this.email = '';
      this.photo = '';
      this.phone = '';
      localStorage.removeItem(KEYS_STORAGE.PROFILE);
    }
  }
});
