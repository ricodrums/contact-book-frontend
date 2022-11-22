<template>
  <q-dialog persistent v-model="showModal">
    <q-card style="width: 35rem; max-width: 99%">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ modalTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <add-contact v-if="addForm" @close-dialog="$emit('closeDialog')" />
        <edit-contact v-if="editForm" @close-dialog="$emit('closeDialog')" />
        <delete-contact v-if="deleteForm" @close-dialog="$emit('closeDialog')" />

        <!-- Phone modals -->
        <add-phone v-if="createPhone" @close-dialog="$emit('closeDialog')" />
        <edit-phone v-if="editPhone" @close-dialog="$emit('closeDialog')" />
        <delete-phone v-if="deletePhone" @close-dialog="$emit('closeDialog')" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AddContact from 'src/components/forms/AddContact.vue';
import EditContact from 'src/components/forms/EditContact.vue';
import DeleteContact from 'src/components/forms/DeleteContact.vue';

import AddPhone from 'src/components/forms/AddPhone.vue';
import EditPhone from 'src/components/forms/EditPhone.vue';
import DeletePhone from 'src/components/forms/DeletePhone.vue';

let showModal = ref(false);

defineProps<{
  modalTitle: string;
  addForm?: boolean;
  editForm?: boolean;
  deleteForm?: boolean;
  createPhone?: boolean;
  editPhone?: boolean;
  deletePhone?: boolean;
}>();
</script>
