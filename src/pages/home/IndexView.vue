<template>
  <q-page class="row items-center justify-center column">
    <div class="row items-center column" v-if="contacts.length === 0">
      <q-icon class="text-muted" name="find_in_page" size="100px" />
      <h5 class="text-center">
        No data found please <br /><br />
        <q-btn
          @click="showNewContactModal = true"
          size="16px"
          flat
          dense
          icon-right="person_add"
          color="secondary"
          label="Add new contact"
        />
      </h5>
    </div>
    <q-list v-else-if="contacts.length !== 0" class="list-container">
      <q-page-sticky position="top" style="z-index: 1" expand>
        <q-item class="user-list-info">
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium"
                >{{ profileStore.getUsername }}'s Contacts book</span
              >
            </q-item-label>
            <q-item-label caption lines="1">
              {{ profileStore.getEmail }}
            </q-item-label>
          </q-item-section>

          <q-item-section class="justify-center" top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                @click="showNewContactModal = true"
                size="16px"
                flat
                dense
                icon="person_add"
                color="secondary"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-page-sticky>

      <q-expansion-item
        v-for="contact in contacts"
        :key="contact.id"
        expand-separator
        :label="contact.name + ' ' + contact.lastname"
        :caption="
          contact.phones.length ? contact.phones[0].number : 'no number'
        "
        group="contact-list"
      >
        <template v-slot:header="{ expanded }">
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white">
              {{ getAvatar(contact.name, contact.lastname) }}
            </q-avatar>
          </q-item-section>

          <q-item-section class="row column">
            <span>{{
              expanded ? getFullname(contact) : getFullname(contact)
            }}</span>
            <span class="text-muted">{{
              contact.phones[0] ? contact.phones[0].number : 'No phone stored'
            }}</span>
          </q-item-section>
        </template>

        <q-card flat bordered>
          <q-item class="text-muted items-center justify-around">
            <q-btn
              icon="add_call"
              color="secondary"
              flat
              dense
              @click="showCreatePhoneModal(contact.id)"
            />
            <q-btn
              icon="edit"
              color="warning"
              flat
              dense
              @click="showEditContactModal(contact.id)"
            />
            <q-btn
              icon="delete"
              color="negative"
              flat
              dense
              @click="showDeleteContactModal(contact.id)"
            />
          </q-item>

          <q-separator style="height: 3px" />

          <q-card-section
            v-for="phone in contact.phones"
            :key="phone.id"
            horizontal
            class="text-center items-center"
          >
            <q-card-section class="col-5 q-pa-sm">
              <span>{{ phone.name ?? 'No description'}}</span>
            </q-card-section>
            <q-card-section class="col-5 q-pa-sm">
              <span>{{ phone.number ?? 'No phone stored'}}</span>
            </q-card-section>
            <div class="col-2 q-pa-sm items-center justify-around">
              <q-btn
                icon="menu"
                color="indigo-4"
                flat
                dense
              >
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="showEditPhoneModal(contact.id, phone)">
                    <q-item-section>Edit number</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="showDeletePhoneModal(contact.id, phone)">
                    <q-item-section>Delete number</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator />

          <q-item class="items-center justify-around text-center">
            <span class="col-4 text-bold">Birthday</span>
            <span class="col-8">
              {{ contact.birthday ? contact.birthday : 'No birthday stored' }}
            </span>
          </q-item>

          <q-separator />

          <q-item class="items-center justify-around text-center">
            <span class="col-4 text-bold">Email</span>
            <span class="col-8">
              {{ contact.email ? contact.email : 'No email stored' }}
            </span>
          </q-item>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-page-sticky
      v-if="contacts.length !== 0"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        color="indigo-3"
        icon="search"
        direction="left"
        size="20px"
        @click="toggleSearch()"
      >
        <q-menu
          v-model="isSearchVisible"
          class="q-px-lg q-py-xd"
          anchor="center left"
          self="center right"
          style="width: 50rem; max-width: 70%"
          persistent
        >
          <q-input v-model="searchText" label="Type to search something" />
        </q-menu>
      </q-fab>
    </q-page-sticky>

    <generic-modal
      add-form
      v-model="showNewContactModal"
      @close-dialog="showNewContactModal = false"
      modal-title="Add Contact"
    />

    <generic-modal
      edit-form
      v-model="isEditContactVisible"
      @close-dialog="hideEditContactModal()"
      modal-title="Edit Contact"
    />

    <generic-modal
      delete-form
      v-model="isDeleteContactVisible"
      @close-dialog="hideDeleteContactModal()"
      modal-title="Delete Contact?"
    />

    <generic-modal
      create-phone
      v-model="isCreatePhoneVisible"
      @close-dialog="hideCreatePhoneModal()"
      modal-title="Add phone"
    />

    <generic-modal
      edit-phone
      v-model="isEditPhoneVisible"
      @close-dialog="hideEditPhoneModal()"
      modal-title="Edit phone"
    />

    <generic-modal
      delete-phone
      v-model="isDeletePhoneVisible"
      @close-dialog="hideDeletePhoneModal()"
      modal-title="Remove phone?"
    />
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

import { useProfileStore } from 'src/stores/profile.store';
import GenericModal from 'src/components/GenericModal.vue';
import { IContact, IContactListResponse, IPhone } from 'src/interfaces/contacts.inteface';
import { getAll } from 'src/services/contacts.service';
import { showNotify } from 'src/utils/notify';
import { getAvatar } from 'src/utils/functions';
import { useContactStore } from 'src/stores/contacts.store';

let contacts = ref<any[]>([]);
let searchText = ref<string>();
let isSearchVisible = ref(false);

let showNewContactModal = ref(false);
let isEditContactVisible = ref(false);
let isDeleteContactVisible = ref(false);

let isCreatePhoneVisible = ref(false);
let isEditPhoneVisible = ref(false);
let isDeletePhoneVisible = ref(false);

const profileStore = useProfileStore();
const contactStore = useContactStore();

const showEditContactModal = (contactToEdit: string): void => {
  contactStore.setEditContact(contactToEdit);
  isEditContactVisible.value = true;
};

const hideEditContactModal = () => {
  fetchContacts({});
  isEditContactVisible.value = false;
}

const showDeleteContactModal = (contactToEdit: string): void => {
  contactStore.setEditContact(contactToEdit);
  isDeleteContactVisible.value = true;
};

const hideDeleteContactModal = (): void => {
  fetchContacts({});
  isDeleteContactVisible.value = false;
};

const showCreatePhoneModal = (contactToEdit: string): void => {
  contactStore.setEditContact(contactToEdit);
  isCreatePhoneVisible.value = true;
};

const hideCreatePhoneModal = () => {
  fetchContacts({});
  isCreatePhoneVisible.value = false;
}

const showEditPhoneModal = (contactToEdit: string, phone: IPhone): void => {
  contactStore.setEditContact(contactToEdit);
  contactStore.setPhoneToEdit(phone);
  isEditPhoneVisible.value = true;
};

const hideEditPhoneModal = () => {
  fetchContacts({});
  isEditPhoneVisible.value = false;
}

const showDeletePhoneModal = (contactToEdit: string, phone: IPhone): void => {
  contactStore.setEditContact(contactToEdit);
  contactStore.setPhoneToEdit(phone);
  isDeletePhoneVisible.value = true;
};

const hideDeletePhoneModal = () => {
  fetchContacts({});
  isDeletePhoneVisible.value = false;
}
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
  searchText.value = null;
};

const getFullname = (contact: any) => {
  return `${contact.name ? contact.name : 'No Name'} ${
    contact.lastname ? contact.lastname : ''
  }`;
};

let filterActivated = false;

watch(searchText, async () => {
  if (searchText.value && searchText.value?.length > 2) {
    let response;
    filterActivated = true;
    try {
      response = await getAll({ search: searchText.value });
      contactStore.setList(response?.results);
      contacts.value = contactStore.getAll;
    } catch (error) {
      showNotify('We got a problem...', 'negative');
    }
  } else if (filterActivated) {
    let response;
    filterActivated = false;
    try {
      response = await getAll({});
      contactStore.setList(response?.results);
    contacts.value = contactStore.getAll;
    } catch (error) {
      showNotify('We got a problem...', 'negative');
    }
    
  }
});

onMounted(async () => {
  fetchContacts({});
});

const fetchContacts = async (options: any) => {
  let response;
  try {
  response = await getAll(options ? options : {});
   contactStore.setList(response?.results);
    contacts.value = contactStore.getAll;
  } catch (error) {
    showNotify('We got a problem...', 'negative');
  }
});
</script>

<style lang="scss">
.list-container {
  height: 82vh;
  overflow-y: scroll;
  padding-top: 1rem;
  width: 40rem;
  max-width: 100%;
}

.user-list-info {
  width: 40rem;
  max-width: 100%;
  background: $white;
}
</style>
