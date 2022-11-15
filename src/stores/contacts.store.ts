import { defineStore } from 'pinia';
import { IContactListResponse, IContactResponse } from 'src/interfaces/contacts.inteface';

export const useContactStore = defineStore('contacts', {
  state: () => ({
    list: [],
    contactToEdit: '',
  }),
  getters: {
    getAll: ({ list }) => list.sort((c1, c2) => (c1.name < c2.name) ? -1 : (c1.name > c2.name) ? 1 : 0),
    getById: ({ list }, id: string) => list.find((contact: IContactResponse) => contact.id === id),
    getContactToEdit: ({ contactToEdit }) => contactToEdit,
  },
  actions: {
    pushContact(contact: IContactResponse) { this.list.push(contact) },
    setList( list: IContactListResponse ) { this.list = list; },
    setEditContact( contactId: string) { this.contactToEdit = contactId },
    removeContactToEdit() { this.contactToEdit = ''},
    resetStore() { this.list = null; this.contactToEdit = '' }
  },
  persist: true
});
