<template>
  <q-page class="row items-center justify-center column">
    <h5 class="h5">Register on Contact Book</h5>
    <div class="q-pa-md" style="width: 45rem; max-width: 100%">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-lg"
      >
        <q-input
          v-model="username"
          label="Your username or email *"
          lazy-rules
          :rules="[ 
            val => required(val) || 'Please at least type your username'
          ]"
        />

        <q-input
          type="password"
          v-model="password"
          label="Your paassword *"
          lazy-rules
          :rules="[
            val => required(val) || 'Please type your password',
          ]"
        />

        <q-input
          type="password"
          v-model="confirmPassword"
          label="Repeat your paassword *"
          lazy-rules
          :rules="[
            val => required(val) || 'Please type your password',
            val => isEqual(val) || 'Passwords do not match',
          ]"
        />

        <div class="row justify-evenly q-mt-2">
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Register" type="submit" color="primary"/>
        </div>
      </q-form>
      <div class="row justify-evenly q-mt-xl">
        <span class="text-muted">If you have an account <router-link :to="{name: 'login'}">login here!</router-link></span>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required, isEqual } from 'src/utils/validators';


let username = ref(null);
let password = ref(null);
let confirmPassword = ref(null);

const onSubmit = () => {
  // TODO!
  console.log('Implement register endpoint and logic around')
}

const onReset = () => {
  username.value = null;
  password.value = null;
  confirmPassword.value = null;
}
</script>
