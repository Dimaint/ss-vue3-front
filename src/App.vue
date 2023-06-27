<template>
  <v-app>
    <router-view />
    <v-layout class="overflow-visible" style="height: 56px">

      <v-bottom-navigation
        v-model="value"
        bg-color="blue-grey"
        style="position: fixed !important"
        mode="shift"
      >


        <v-btn v-for="el in links" :key="el.title" :to="el.href">
          <v-icon>{{el.icon}}</v-icon>

          <span>{{el.title}}</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>

<script>

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
    return {};
  },
};
</script>
