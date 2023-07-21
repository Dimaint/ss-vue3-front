<template >
  <v-container>
    <v-row class="pt-6">
      <v-col cols="10">fast actions
        <fast-actions />
      </v-col>
      <v-col cols="2">
        <v-avatar color="grey" size="150" rounded="0">
          <v-img :width="150" aspect-ratio="4/3" :src="user.avatar"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        personal events
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        all events
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FastActions from '@/components/FastActions.vue';

import { useUserStore } from '@/store/user';
import { storeToRefs } from "pinia";

export default {
  components: {
    FastActions
  },

  setup() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    return {
      user
    }
  }
}
</script>
<style lang="">

</style>
