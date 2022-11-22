<template>
  <q-form @submit="onSubmit" @reset="$emit('closeDialog');" class="q-gutter-md q-px-md">
    <q-input v-model="name" label="Name" />
    <q-input v-model="number" label="number" />
    <div class="row justify-evenly q-mt-3">
      <q-btn label="Cancel" type="reset" color="primary" flat />
      <q-btn label="Save" type="submit" color="warning" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { edit } from 'src/services/phones.service';

import { showNotify } from 'src/utils/notify';
import { useContactStore } from 'src/stores/contacts.store';
import { IPhone } from 'src/interfaces/contacts.inteface';

let name = ref<string>('');
let number = ref<string>('');
let contactId: string;
let phoneId: string;

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();

onMounted(async () => {
  contactId = contactStore.getContactToEdit;
  phoneId = contactStore.getPhoneToEdit.id
  name.value = contactStore.getPhoneToEdit.name;
  number.value = contactStore.getPhoneToEdit.number;
});

const onSubmit = async () => {
  try {
    await edit ({
      name: name.value,
      number: number.value,
    }, contactId, phoneId);
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
