import { defineStore } from 'pinia';
import {
  IContactListResponse,
  IContactResponse,
  IPhone,
} from 'src/interfaces/contacts.inteface';

export const useContactStore = defineStore('contacts', {
  state: () => ({
    list: [],
    contactToEdit: '',
    phoneToEdit: undefined,
  }),
  getters: {
    getAll: ({ list }) =>
      list.sort((c1, c2) =>
        c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0
      ),
    getById: ({ list }, id: string) =>
      list.find((contact: IContactResponse) => contact.id === id),
    getContactToEdit: ({ contactToEdit }) => contactToEdit,
    getPhoneToEdit: ({ phoneToEdit }) => phoneToEdit,
  },
  actions: {
    pushContact(contact: IContactResponse) {
      this.list.push(contact);
    },
    setList(list: IContactListResponse) {
      this.list = list;
    },
    setEditContact(contactId: string) {
      this.contactToEdit = contactId;
    },
    setPhoneToEdit(phone: IPhone) {
      this.phoneToEdit = phone;
    },
    addPhone(phone: IPhone, contactId: string) {
      this.list.filter((contact: IContactResponse) => {
        if (contact.id === contactId)
          contact.phones?.push(phone);
        
      });
    },
    removeContactToEdit() {
      this.contactToEdit = '';
    },
    resetStore() {
      this.list = null;
      this.contactToEdit = '';
    },
  },
  persist: true,
});
