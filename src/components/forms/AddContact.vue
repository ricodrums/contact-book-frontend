<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-px-md">
    <q-input v-model="name" label="Name" />

    <q-input v-model="lastname" label="Lastname" />

    <q-input v-model="email" label="Email" />

    <q-input v-model="birthday" mask="date" label="Birthday">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="birthday" color="indigo-3">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="indigo-4" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-file clearable v-model="photo" label="Photo" />

    <q-input v-model="phone" label="Phone" />

    <div class="row justify-evenly q-mt-3">
      <q-btn label="Reset" type="reset" color="primary" flat />
      <q-btn label="Save" type="submit" color="positive" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { create } from 'src/services/contacts.service';

import { maxLength } from 'src/utils/validators';
import { showNotify } from 'src/utils/notify';
import { IContactResponse } from 'src/interfaces/contacts.inteface';
import { useContactStore } from 'src/stores/contacts.store';

let name = ref<string>('');
let lastname = ref<string>('');
let email = ref<string>('');
let birthday = ref<string>('');
let photo = ref(null);
let phone = ref<string>('');

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();

const onSubmit = async () => {
  let response: IContactResponse;
  try {
    response = await create({
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      birthday: birthday.value,
      photo: photo.value,
      phone: phone.value,
    });
    showNotify('Success!', 'positive');
    contactStore.pushContact(response);
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
  $emit('closeDialog');
};

const onReset = () => {
  name.value = '';
  lastname.value = '';
  email.value = '';
  birthday.value = '';
  photo.value = null;
  phone.value = '';
};
</script>
