<template >
  <v-container>
    <v-card class="mx-auto px-6 py-8" width="344">
      <!-- <v-form v-model="form" @submit.prevent="onSubmit"> -->
        <v-text-field v-model="username" :readonly="loading" class="mb-2" clearable
          label="Username"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" clearable label="Password"
          placeholder="Enter your password"></v-text-field>

        <br>

        <v-btn @click="signIn()" :disabled="!username||!password" :loading="is_loading" block color="success" size="large" type="submit" variant="elevated">
          Sign In
        </v-btn>
      <!-- </v-form> -->
    </v-card>
  </v-container>
</template>
<script>
import { useUserStore } from "@/store/user";
import {ref} from "vue";
import { storeToRefs } from "pinia";

// import { notify } from "@kyvg/vue3-notification";

const store = useUserStore();
const username = ref('admin');
const password = ref('admin');
const form = ref(false);
const { is_loading } = storeToRefs(store);

function signIn() {
  const payload = {
    username: username.value,
    password: password.value
  }
  store.LOGIN(payload);
}

export default {
  setup() {

    return {
      store,
      username,
      password,
      form,
      signIn,
      is_loading
    };
  },
}





</script>
<style lang="scss"></style>
