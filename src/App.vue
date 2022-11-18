<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from 'src/stores/auth.store';
import { KEYS_STORAGE, ROUTER } from 'src/constants';
import { IAuthResponse } from 'src/interfaces/auth.interface';

const router$ = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if(authStore.isAuthenticated) {
    router$.push({ name: ROUTER.HOME });
  }
});
</script>
