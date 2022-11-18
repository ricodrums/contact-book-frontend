<template>
  <q-dialog
  persistent
  v-model="showModal"
  >
  <q-card style="width: 35rem; max-width: 99%;">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ modalTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <add-contact v-if="addForm" @close-dialog="$emit('closeDialog')"/>
        <edit-contact v-if="editForm" @close-dialog="$emit('closeDialog')"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import AddContact from 'src/components/forms/AddContact.vue';
  import EditContact from 'src/components/forms/EditContact.vue';

  let showModal = ref(false);

  defineProps <{
    modalTitle: string,
    addForm?: boolean,
    editForm?: boolean,
    deleteForm?: boolean,
  }>();

</script>
