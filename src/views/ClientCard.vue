<template >
   <v-container>

<v-row>
  <v-btn @click="router.go(-1)" size="x-small" icon="mdi-arrow-left"></v-btn>

</v-row>
<v-row>
  <v-col cols="3">
    <v-card class="mx-auto pa-2">
      <v-list density="compact" nav>
        <v-list-subheader>REPORTS{{ activeTab  }}</v-list-subheader>

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
    <group-list v-if="activeTab.id == 2"/>
    <v-card v-if="activeTab.id == 1" class="mx-auto pa-4">
    <div><v-img :max-width="150" aspect-ratio="1/1" cover src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"></v-img>
    </div>
    <!-- <p class="text-subtitle-1 ">Должность: <span class="font-weight-light">{{ employee.rank }}</span></p> -->
    <p class="text-subtitle-1 ">Фамилия: <span class="font-weight-light">{{ client.last_name }}</span></p>
    <p class="text-subtitle-1 ">Имя: <span class="font-weight-light">{{ client.first_name }}</span></p>
    <p class="text-subtitle-1 ">Отчество: <span class="font-weight-light">{{ client.middle_name }}</span></p>
    <p class="text-subtitle-1 ">День рождения: <span class="font-weight-light">{{
      moment(client.birthday).format('ll') }}</span></p>
    <p class="text-subtitle-1 ">Телефон: <span class="font-weight-light">{{ client.phone }}</span></p>
  </v-card>
  </v-col>
</v-row>


</v-container>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { onMounted } from "vue";
import axios from 'axios'
import moment from 'moment'
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const client = ref({})
    const activeTab = ref({})

    const items = [
      { id: 1, text: 'БИО', icon: 'mdi-account' },
      { id: 2, text: 'Группы', icon: 'mdi-account-group-outline' },
      { id: 3, text: 'Conversions', icon: 'mdi-flag' },
    ];

    async function getClient() {
      let { data } = await axios.get('http://localhost:8000/clients/' + route.params.id)

      client.value = data
    }
    onMounted(() => {

      getClient();

      activeTab.value = items[0]
    });
    watch(route, () => console.log('route.params'));
    return {
      client,
      router,
      moment,
      items,
      activeTab
    }
  }
}
</script>
<style lang="">

</style>
