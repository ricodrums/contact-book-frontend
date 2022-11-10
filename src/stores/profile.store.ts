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
        photo && photo !== '' ? photo
        : name && name !== '' && lastname && lastname !== '' ? `${name.charAt(0)}${lastname.charAt(0)}`
        : username && username !== '' ? `${username.charAt(0)}`
        : `${email.charAt(0)}`,

    getPhoto: ({ photo }) => photo,
    getUsername: ({ username }) => username === '' ? 'No username' : username,
    getFullname: ({ name, lastname }) => `${name} ${lastname}`,
    getEmail: ({ email }) => email === '' ? 'No email' : email,
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
    },

    removeProfile() {
      this.name = '';
      this.lastname = '';
      this.username = '';
      this.email = '';
      this.photo = '';
      this.phone = '';
    }
  },
  persist: true
});
