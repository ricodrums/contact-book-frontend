<template>
  <q-form @submit="onSubmit" @reset="$emit('closeDialog');" class="q-gutter-md q-px-md">
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

    <div class="row justify-evenly q-mt-3">
      <q-btn label="Cancel" type="reset" color="primary" flat />
      <q-btn label="Save" type="submit" color="warning" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { edit, getOne } from 'src/services/contacts.service';

import { showNotify } from 'src/utils/notify';
import { IContactResponse } from 'src/interfaces/contacts.inteface';
import { useContactStore } from 'src/stores/contacts.store';
import { formatDateB } from 'src/utils/functions';

let contactId = ref<string>('');
let name = ref<string | undefined>(undefined);
let lastname = ref<string | undefined>(undefined);
let email = ref<string | undefined>(undefined);
let birthday = ref<string | undefined>(undefined);
let photo = ref(null);

const $emit = defineEmits(['closeDialog']);
const contactStore = useContactStore();

let response: IContactResponse;

onMounted(async () => {
  contactId.value = contactStore.getContactToEdit;
  try {
    response = await getOne(contactId.value);
    contactId.value = response.id;
    name.value = response.name ?? undefined;
    lastname.value = response.lastname ?? undefined;
    email.value = response.email ?? undefined;
    birthday.value = response.birthday ? formatDateB(response.birthday) : undefined;
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
});

const onSubmit = async () => {
  try {
    response = await edit(
      {
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        birthday: birthday.value,
        photo: photo.value,
      },
      contactId.value
    );
    showNotify('Success!', 'positive');
  } catch (error) {
    console.error(error as string);
    showNotify('We got a problem', 'negative');
  }
  contactStore.removeContactToEdit();
  $emit('closeDialog');
};

</script>
