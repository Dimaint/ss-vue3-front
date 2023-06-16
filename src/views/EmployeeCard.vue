<template>
  <v-card>
    <v-card-title>
      <v-btn @click="router.go(-1)" size="x-small" icon="mdi-arrow-left"></v-btn>
    </v-card-title>
{{employee}}

  </v-card>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import {  watch, ref } from 'vue'
import { onMounted } from "vue";
import axios from 'axios'

export default {
  setup () {
    const route = useRoute();
    const router = useRouter();
    const employee = ref({})

    async function getEmployee() {
      let {data}= await axios.get('http://localhost:8008/employee/'+route.params.id)

      employee.value = data
    }
    onMounted(() => {

      getEmployee()
    });
    watch(route, () => console.log('route.params'));
    return {
      employee,
      router
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
