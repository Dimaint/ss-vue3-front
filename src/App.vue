<template>
  <v-app>
    <notifications position="center" />
    <v-system-bar color="blue-grey">
      <v-spacer></v-spacer>
      <span style="cursor: pointer;" v-if="user != null" class="ms-2"><v-icon icon="mdi-account" class="ms-2"></v-icon>
      {{ `${user.last_name} ${user.first_name}` }}</span>
      <span style="cursor: pointer;" v-if="user == null" @click="auth" class="ms-2"><v-icon icon="mdi-account"
          class="ms-2"></v-icon> Authentication </span>

      <v-spacer></v-spacer>
      <v-icon v-if="user != null" @click="logout" icon="mdi-exit-run" class="ms-2"></v-icon>

      <!-- <span class="ms-2">3:13PM</span> -->
    </v-system-bar>
    <router-view class="mt-8" />
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" bg-color="blue-grey" style="position: fixed !important" mode="shift">
        <v-btn v-for="el in links" :key="el.title" :to="el.href">
          <v-icon>{{ el.icon }}</v-icon>

          <span>{{ el.title }}</span>
        </v-btn>


      </v-bottom-navigation>
    </v-layout>

  </v-app>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user';
import { storeToRefs } from "pinia";

export default {
  data: () => ({
    value: 0,
    links: [
      { title: 'Home', href: '/', icon: 'mdi-home' },
      { title: 'Employee', href: '/employee', icon: 'mdi-account-group' },
      { title: 'Clients', href: '/clients', icon: 'mdi-account-supervisor-outline' }
    ]
  }),
  components: {

  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    function logout() {
      userStore.LOGOUT()
      // router.push({ path: `/login` })
    }

    function auth() {
      router.push({ path: `/login` })
    }

    return {
      logout,
      user,
      auth
    };
  },
};
</script>

<style>
tr:hover {
  background-color: #cfd8dc;
  cursor: pointer;
}
</style>
