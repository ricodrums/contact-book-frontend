<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-px-md">
    <q-input v-model="name" label="Name" />
    <q-input v-model="number" label="number" />
    <div class="row justify-evenly q-mt-3">
      <q-btn label="Reset" type="reset" color="primary" flat />
      <q-btn label="Save" type="submit" color="positive" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { create } from 'src/services/phones.service';

import { showNotify } from 'src/utils/notify';
import { useContactStore } from 'src/stores/contacts.store';

let name = ref<string>('');
let number = ref<string>('');
let contactId: string;

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();

onMounted(async () => {
  contactId = contactStore.getContactToEdit;
});

const onSubmit = async () => {
  try {
    await create({
      name: name.value,
      number: number.value,
    }, contactId);
    showNotify('Success!', 'positive');
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
  $emit('closeDialog');
};

const onReset = () => {
  name.value = '';
  number.value = '';
};
</script>
