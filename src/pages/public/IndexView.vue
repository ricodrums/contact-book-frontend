<template>
  <q-page class="flex column items-center justify-evenly q-pa-md">
    <article class="flex column">
      <h5 class="h5 text-center">Your people on te go!</h5>
      <p class="text-justify">Save time searching on old books, stop having tons of papers on your wallet and start to use the only thing that is with you always.</p>
      <p class="text-center text-bold">Your phone</p>
    </article>
    <article>
      <q-btn :to="{name: ROUTER.LOGIN}" color="primary" label="Get Started" no-caps flat icon-right="trending_flat"></q-btn>
    </article>
  </q-page>
</template>

<script lang="ts" setup>
import { ROUTER } from '../../constants';

</script>
