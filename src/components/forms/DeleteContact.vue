<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-px-md">
    <div>
      You are going to delete <strong>{{ name ? name : 'No name' }}</strong
      >, Are you sure?
    </div>
    <div class="row justify-evenly q-mt-3">
      <q-btn label="Cancel" type="reset" color="primary" flat />
      <q-btn label="Delete" type="submit" color="negative" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { deleteContact, getOne } from 'src/services/contacts.service';

import { showNotify } from 'src/utils/notify';
import { IContactResponse } from 'src/interfaces/contacts.inteface';
import { useContactStore } from 'src/stores/contacts.store';

let contactId = ref<string>('');
let name = ref<string | undefined>('');

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();

let response: IContactResponse;

onMounted(async () => {
  contactId.value = contactStore.getContactToEdit;
  try {
    response = await getOne(contactId.value);
    contactId.value = response.id;
    name.value = response.name;
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
});

const onSubmit = async () => {
  try {
    response = await deleteContact(contactId.value);
    showNotify('Success!', 'positive');
    contactStore.pushContact(response);
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
