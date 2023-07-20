<template>
  <v-container>
    <!-- <h1>{{ moment('2023-02-02').format('YYYY-MM-DD') }}</h1> -->
    <v-btn @click="store.GET_EMPLOYEES" icon="mdi-refresh"></v-btn>
    <v-progress-circular
      color="primary"
      indeterminate
      :size="128"
      :width="10"
      v-if="is_loading"
    ></v-progress-circular>

    <v-table fixed-header height="70vh">
      <thead>
        <tr>
          <th class="text-left" v-for="el of tableHeaders" :key="el">
            {{ el }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in employee" :key="item.id" @click="goToEmployeeCard(item)">
          <td>{{ item.last_name ? item.last_name : "" }}</td>
          <td>{{ item.first_name ? item.first_name : "" }}</td>
          <td>{{ item.middle_name ? item.middle_name : "" }}</td>
          <td>{{ item.birthday ? moment(item.birthday).format('ll'): "" }}</td>
          <td>{{ item.role ? item.role : "" }}</td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center">
    <v-pagination
      v-model="page"
      :length="total/7"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
  </v-container>
</template>

<script >
import { useEmployeeStore } from "@/store/employee";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import moment from 'moment'

const tableHeaders = [
  "Фамилия",
  "Имя",
  "Отчество",
  "День рождения",
  "Должность",
];
const page = ref(1)

const store = useEmployeeStore();
const { employee, is_loading, total } = storeToRefs(store);
import { useRouter } from 'vue-router'

export default {
  data: () => ({ value: 1 }),
  components: {},
  setup() {
    const router = useRouter()


    onMounted(() => {
      // console.log("mounted");
      let params = {page: page.value}
      store.GET_EMPLOYEES(params);
    });
    function goToEmployeeCard(item) {

    router.push({ path: `/employee/${item.id}` })
  }


  watch(page, () => store.GET_EMPLOYEES({page:page.value}));

    return {
      store,
      employee,
      is_loading,
      tableHeaders,
      goToEmployeeCard,
      page,
      total,
      moment
    };
  },

};
</script>

<!-- <style>
tr:hover {
  background-color: #cfd8dc;
  cursor: pointer;
}
</style> -->
