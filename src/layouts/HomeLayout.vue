<template>
  <q-layout view="hHh lpR fFf" class="background main-layout">
    
    <q-page-container class="container">
      <navigation-bar :isPublic="false"/>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script lang="ts" setup>
import NavigationBar from '../components/NavigationBar.vue';
components: { NavigationBar }
</script>
