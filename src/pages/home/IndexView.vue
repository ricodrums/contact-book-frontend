<template>
  <q-page class="row items-center justify-center column">
    <div class="row items-center column" v-if="contacts.length === 0">
      <q-icon class="text-muted" name="find_in_page" size="100px"/>
      <h5 class="text-center">No data found please <br><br>
        <q-btn @click="showNewContactModal = true" size="16px" flat dense icon-right="person_add" color="secondary" label="Add new contact" />
      </h5>
    </div>
    <q-list v-else class="list-container">
      <q-page-sticky position="top" style="z-index: 1;" expand>
        <q-item class="user-list-info">
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ profileStore.getUsername }}'s Contacts book</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ profileStore.getEmail }}
            </q-item-label>
          </q-item-section>

          <q-item-section class="justify-center" top side>
            <div class="text-grey-8 q-gutter-xs ">
              <q-btn @click="showNewContactModal = true" size="16px" flat dense icon="person_add" color="secondary" />
            </div>
          </q-item-section>
        </q-item>
      </q-page-sticky>

      <q-expansion-item
      v-for="contact in contacts " :key="contact.id"
      expand-separator
      :label="contact.name + ' ' + contact.lastname"
      :caption="contact.phones.length ? contact.phones[0].number : 'no number'"
      group="contact-list"
      >
      <template v-slot:header="{ contactName }">
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white">
            {{ getAvatar(contact.name, contact.lastname) }}
          </q-avatar>
        </q-item-section>

        <q-item-section class="row column">
          <span>{{ contactName ? getFullname(contact) : getFullname(contact) }}</span>
          <span class="text-muted">{{ contact.phones[0] ? contact.phones[0].number : 'No phone stored' }}</span>
        </q-item-section>

      </template>

      <q-card flat bordered>
        <q-item class="text-muted items-center justify-around">
          <q-btn icon="edit" color="warning" flat dense @click="showEditContactModal(contact.id)"/>
          <q-btn icon="delete" color="negative" flat dense />
        </q-item>

        <q-separator />

        <q-card-section v-for="phone in contact.phones" :key="phone.id" horizontal>
          <q-card-section class="col-5">
            {{ phone.name }}
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="col-7">
            {{ phone.number }}
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-item class="items-center justify-around">
          <span class="text-bold">Birthday</span>
          <span>{{ contact.birthday ? contact.birthday : 'No birthday stored' }}</span>
        </q-item>
      </q-card>
      </q-expansion-item>
    </q-list>
    <q-page-sticky
      v-if="contacts.length !== 0"
      position="bottom-right"
      :offset="[18, 18]">
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
        style="width: 50rem; max-width: 70%;"
        persistent
        >
          <q-input
            v-model="searchText"
            label="Type to search something"
          />
        </q-menu>
      </q-fab>    
    </q-page-sticky>

    <generic-modal
    add-form
    v-model="showNewContactModal"
    @close-dialog="showNewContactModal = false"
    modal-title="Add Contact"/>

    <generic-modal
    edit-form
    v-model="isEditContactVisible"
    @close-dialog="isEditContactVisible = false"
    modal-title="Edit Contact"/>

  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

import { useProfileStore } from 'src/stores/profile.store';
import GenericModal from 'src/components/GenericModal.vue';
import { IContact, IContactListResponse } from "src/interfaces/contacts.inteface";
import { getAll } from "src/services/contacts.service";
import { showNotify } from "src/utils/notify";
import { getAvatar } from 'src/utils/functions';
import { useContactStore } from "src/stores/contacts.store";

let contacts = ref<any>([]);
let searchText = ref(null);
let isSearchVisible = ref(false);

let showNewContactModal = ref(false);
let isEditContactVisible = ref(false);

const profileStore = useProfileStore();
const contactStore = useContactStore();

const showEditContactModal = (contactToEdit: string): void => {
  console.log('Opening Edit Modal:', contactToEdit);
  contactStore.setEditContact(contactToEdit);
  isEditContactVisible.value = true;
}

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
  searchText.value = null;
}

const getFullname = (contact: any) => {
  return `${contact.name ? contact.name : 'No Name'} ${contact.lastname ? contact.lastname : ''}`
}

onMounted(async () => {
  let response;
  try {
  response = await getAll();
  } catch (error) {
    showNotify('We got a problem...', 'negative');
  }
  contactStore.setList(response?.results);
  contacts.value = contactStore.getAll;
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