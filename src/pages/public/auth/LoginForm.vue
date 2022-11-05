<template>
  <q-page class="row items-center justify-center column">
    <h5 class="h5">Login to your account</h5>
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

        <div class="row justify-evenly q-mt-2">
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Login" type="submit" color="primary"/>
        </div>
      </q-form>
      <div class="row justify-evenly q-mt-xl">
        <span class="text-muted">If you do not have an account <router-link :to="{name: 'register'}">register here!</router-link></span>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators';


let username = ref(null);
let password = ref(null);

const onSubmit = () => {
  // TODO!
  console.log('Implement login endpoint and logic around')
}

const onReset = () => {
  username.value = null;
  password.value = null;
}
</script>
