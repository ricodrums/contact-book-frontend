<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-px-md">
    <div>
      You are going to remove one contact number. Are you sure? 
    </div>
    <div class="row justify-evenly q-mt-3">
      <q-btn label="Cancel" type="reset" color="primary" flat />
      <q-btn label="Delete" type="submit" color="negative" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { showNotify } from 'src/utils/notify';
import { IPhone } from 'src/interfaces/contacts.inteface';
import { useContactStore } from 'src/stores/contacts.store';
import { deletePhone } from 'src/services/phones.service';

let contactId = ref<string>('');
let phoneId: string;

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();


onMounted(async () => {
  contactId.value = contactStore.getContactToEdit;
  phoneId = contactStore.getPhoneToEdit.id;
});

const onSubmit = async () => {
  try {
    await deletePhone(contactId.value, phoneId);
    showNotify('Success!', 'positive');
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
  onReset();
  $emit('closeDialog');
};

const onReset = () => {
  contactStore.removeContactToEdit();
  $emit('closeDialog');
};
</script>
