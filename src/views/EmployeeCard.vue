<template>
  <v-container>
    <p>{{ activeTab.value }}</p>
    <v-row>
      <v-btn @click="router.go(-1)" size="x-small" icon="mdi-arrow-left"></v-btn>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto pa-2">
          <v-list density="compact" nav>
            <v-list-subheader>REPORTS</v-list-subheader>

            <v-list-item v-for="(item, i) in items" :key="i" @click="activeTab=item" color="primary">
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="mx-auto pa-4">
        <div><v-img :max-width="150" aspect-ratio="1/1" cover src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </div>
        <!-- <p class="text-subtitle-1 ">Должность: <span class="font-weight-light">{{ employee.rank }}</span></p> -->
        <p class="text-subtitle-1 ">Фамилия: <span class="font-weight-light">{{ employee.last_name }}</span></p>
        <p class="text-subtitle-1 ">Имя: <span class="font-weight-light">{{ employee.first_name }}</span></p>
        <p class="text-subtitle-1 ">Отчество: <span class="font-weight-light">{{ employee.middle_name }}</span></p>
        <p class="text-subtitle-1 ">День рождения: <span class="font-weight-light">{{
          moment(employee.birthday).format('ll') }}</span></p>
        <p class="text-subtitle-1 ">Телефон: <span class="font-weight-light">{{ employee.phone }}</span></p>
      </v-card>
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
    const activeTab = ref({})

    const items = [
      { text: 'БИО', icon: 'mdi-account' },
      { text: 'Группы', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
    ];

    async function getEmployee() {
      let { data } = await axios.get('http://localhost:8000/employee/' + route.params.id)

      employee.value = data
    }
    onMounted(() => {

      getEmployee();
      console.log(items)
      activeTab.value = items[0]
    });
    watch(route, () => console.log('route.params'));
    return {
      employee,
      router,
      moment,
      items,
      activeTab
    }
  }
}
</script>

<style  scoped>
  .v-card {
    border-width: 1px!important;
  }
  </style>
