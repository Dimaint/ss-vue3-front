<template >
 <v-container>
    <v-btn @click="store.GET_CLIENTS" icon="mdi-refresh"></v-btn>
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
        <tr v-for="item in clients" :key="item.id" @click="goToClientCard(item)">
          <td>{{ item.last_name ? item.last_name : "" }}</td>
          <td>{{ item.first_name ? item.first_name : "" }}</td>
          <td>{{ item.middle_name ? item.middle_name : "" }}</td>
          <td>{{ item.birthday ? moment(item.birthday).format('ll'): "" }}</td>
          <td>{{ item.clientType ? item.clientType : "" }}</td>
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
import { useClientStore } from "@/store/client";
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

const store = useClientStore();
const { clients, is_loading, total } = storeToRefs(store);
import { useRouter } from 'vue-router'

export default {
  data: () => ({ value: 1 }),
  components: {},
  setup() {
    const router = useRouter()


    onMounted(() => {
      // console.log("mounted");
      let params = {page: page.value}
      store.GET_CLIENTS(params);
    });
    function goToClientCard(item) {

    router.push({ path: `/client/${item.id}` })
  }


  watch(page, () => store.GET_CLIENTS({page:page.value}));

    return {
      store,
      clients,
      is_loading,
      tableHeaders,
      goToClientCard,
      page,
      total,
      moment
    };
  },

};
</script>

<style lang="">

</style>
