<template>
  <v-container>
    <v-row>
      <v-btn @click="router.go(-1)" size="x-small" icon="mdi-arrow-left"></v-btn>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-img :width="250" aspect-ratio="1/1" cover
          src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-col>
      <v-col cols="9">
          <p class="text-subtitle-1 ">Должность: <span class="font-weight-light">{{ employee.rank }}</span></p>
          <p class="text-subtitle-1 ">Фамилия: <span class="font-weight-light">{{ employee.last_name }}</span></p>
          <p class="text-subtitle-1 ">Имя: <span class="font-weight-light">{{ employee.first_name }}</span></p>
          <p class="text-subtitle-1 ">Отчество: <span class="font-weight-light">{{ employee.middle_name }}</span></p>
          <p class="text-subtitle-1 ">День рождения: <span class="font-weight-light">{{ moment(employee.birthday).format('ll') }}</span></p>
          <p class="text-subtitle-1 ">Телефон: <span class="font-weight-light">{{ employee.phone }}</span></p>
        </v-col>
    </v-row>


  </v-container>
</template>

<script >
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { onMounted } from "vue";
import axios from 'axios'
import moment from 'moment'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employee = ref({})

    async function getEmployee() {
      let { data } = await axios.get('http://localhost:8000/employee/' + route.params.id)

      employee.value = data
    }
    onMounted(() => {

      getEmployee()
    });
    watch(route, () => console.log('route.params'));
    return {
      employee,
      router,
      moment
    }
  }
}
</script>

<style lang="scss" scoped></style>
