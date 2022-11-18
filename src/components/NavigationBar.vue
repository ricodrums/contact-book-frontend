<template>
  <!-- Header -->
  <q-header class="bg-indigo-2 text-dark" elevated>
    <q-toolbar class="q-px-none">
      <q-btn class="text-h6" :to="{name: isPublic ? ROUTER.INDEX : ROUTER.HOME}" label="Contact Book" flat no-caps/>
      <q-space />

      <!-- Public section -->
      <div v-if="isPublic">
        <q-btn class="text-subtitle1 desktop-only" :to="{name: ROUTER.LOGIN}" label="Login" flat no-caps/>
        <q-btn class="text-subtitle1 desktop-only" :to="{name: ROUTER.REGISTER}" label="Sign Up" flat no-caps/>
        <q-btn class="text-subtitle1 desktop-only" :to="{name: ROUTER.ABOUT}" label="About Us" flat no-caps/>
        <q-btn class="mobile-only" stretch flat no-caps icon="menu">
          <q-menu>
            <q-list style="min-width: 100px">
              <router-link :to="{name: ROUTER.LOGIN}">
                <q-item clickable v-close-popup>
                  <q-item-section class="text-black">Login</q-item-section>
                </q-item>
              </router-link>
              <router-link :to="{name: ROUTER.REGISTER}">
                <q-item clickable v-close-popup>
                  <q-item-section class="text-black">Sign Up</q-item-section>
                </q-item>
              </router-link>
              <router-link :to="{name: ROUTER.ABOUT}">
                <q-item clickable v-close-popup>
                  <q-item-section class="text-black">About Us</q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <!-- Auth section -->
      <q-btn flat v-if="!isPublic">
        <q-avatar size="48px">
          <img
            :src="profileStore.getAvatar"
            alt="User Avatar"
            v-if="profileStore.getPhoto !== ''"
          />
          <div class="avatar row justify-center items-center" v-else>
            <span>{{ profileStore.getAvatar }}</span>
          </div>
        </q-avatar>
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-sm">{{ profileStore.getUsername }}</div>
              <div class="q-gutter-sm">
                <q-radio v-model="userLanguage" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="english" label="English" />
                <q-radio v-model="userLanguage" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="spanish" label="Español" />
              </div>    
              <q-separator inset class="q-mb-md" />
              <q-btn
                color="primary"
                label="Logout"
                push
                v-close-popup
                @click="logoutButton()"
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
  <!-- End Header -->
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ROUTER } from 'src/constants';
import { logout } from 'src/services/auth.service'
import { hideLoading, showLoading } from 'src/utils/loading';
import { useProfileStore } from "src/stores/profile.store";

let userLanguage = ref<string>('english')
defineProps<{ isPublic: boolean, }>()

const router$ = useRouter();
const profileStore = useProfileStore();

const logoutButton = async () => {
  showLoading();
  await logout();
  router$.push({name: ROUTER.INDEX});
  hideLoading();
}

</script>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  color: $white;
  background: $secondary;
}
</style>