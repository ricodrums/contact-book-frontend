<template>
  <q-page class="row items-center justify-center column">
    <div class="row items-center column" v-if="contacts.length == 0">
      <q-icon class="text-muted" name="find_in_page" size="100px"/>
      <h5 class="text-center">No data found please<br><span class="cursor-pointer text-secondary">Add a Contact</span></h5>
    </div>
    <q-list v-else class="list-container">
      <q-page-sticky position="top" style="z-index: 1;" expand>
        <q-item class="user-list-info">
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">Username Contacts book</span>
            </q-item-label>
            <q-item-label caption lines="1">
              user@email.com
            </q-item-label>
          </q-item-section>

          <q-item-section class="justify-center" top side>
            <div class="text-grey-8 q-gutter-xs ">
              <q-btn size="16px" flat dense icon="person_add" color="secondary" />
              <!-- <q-btn size="16px" flat icon="more_vert" /> -->
            </div>
          </q-item-section>
        </q-item>
      </q-page-sticky>

      <q-expansion-item
      v-for="contact in contacts" :key="contact.id"
      expand-separator
      :label="contact.name + ' ' + contact.lastname"
      :caption="contact.phones[0].number"
      group="contact-list"
      >
      <template v-slot:header="{ contactName }">
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white">
            {{ contact.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section class="row column">
          <span>{{ contactName ? contact.name + ' ' + contact.lastname : contact.name + ' ' + contact.lastname }}</span>
          <span class="text-muted">{{ contact.phones[0].number }}</span>
        </q-item-section>

      </template>

      <q-card flat bordered>
        <q-item class="text-muted items-center justify-around">
          <q-btn icon="edit" color="warning" flat dense />
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
          <span>{{ contact.birthday }}</span>
        </q-item>
      </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

let contacts = ref<any>([])

onMounted(() => {
  let limit = Math.ceil(Math.random() * 100);
  for (let index = 0; index < limit; index++) {
    contacts.value.push({
      name: 'Name' + index,
      lastname: 'Lastname' + index,
      letter: index < 10 ? '0'+index : index,
      email: 'cmail'+index+'@contact-book.com',
      birthday: Math.ceil(Math.random()*30) + ' - 0' + Math.ceil(Math.random()*10) + ' - 22' + Math.ceil(Math.random()*10),
      photo: '',
      phones: [
        {
        name: 'Home',
        number: '' + Math.ceil(Math.random()*1000000000)
        },
        {
        name: 'Office',
        number: '' + Math.ceil(Math.random()*1000000000)
        },
        {
        name: 'Personal',
        number: '' + Math.ceil(Math.random()*1000000000)
        },
        {
        name: 'Other',
        number: '' + Math.ceil(Math.random()*1000000000)
        },
      ]});
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