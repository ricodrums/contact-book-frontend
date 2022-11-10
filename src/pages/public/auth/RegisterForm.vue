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
          label="Your username *"
          lazy-rules
          :rules="[ 
            val => required(val) || 'Please type your username',
          ]"
        />

        <q-input
          type="password"
          v-model="password"
          label="Your paassword *"
          lazy-rules
          :rules="[
            val => required(val) || 'Please type your password',
            val => isValidPassword(val) || 'Password is too easy, use mayus, minus, number and special characters'
          ]"
        />

        <q-input
          type="password"
          v-model="confirmPassword"
          label="Repeat your paassword *"
          lazy-rules
          :rules="[
            val => required(val) || 'Please type your password',
            val => isEqual(val, password) || 'Passwords do not match',
          ]"
        />

        <div class="row justify-evenly q-mt-2">
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Register" type="submit" color="primary"/>
        </div>
      </q-form>
      <div class="row justify-evenly q-mt-xl">
        <span class="text-muted">If you have an account <router-link :to="{name: ROUTER.LOGIN}">login here!</router-link></span>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from 'src/services/auth.service';
import { generateEmail } from 'src/utils/functions';


import { required, isEqual, isValidPassword } from 'src/utils/validators';
import { showNotify } from 'src/utils/notify'
import { ROUTER } from 'src/constants';

const router$ = useRouter();

let username = ref<string>('');
let password = ref<string>('');
let confirmPassword = ref<string>('');

const onSubmit = async () => {
  let message: string;
  try {
    message = await register({
        email: generateEmail(username.value),
        username: username.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }) ?? '';
    showNotify('Success!', 'positive');
    router$.push({ name: ROUTER.HOME });
  
  } catch (error) {
    message = error as string ?? '';
    showNotify(message, 'negative');
  }
}

const onReset = () => {
  username.value = '';
  password.value = '';
  confirmPassword.value = '';
}

</script>
