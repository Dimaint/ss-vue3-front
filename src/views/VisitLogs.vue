<template >
  <v-container>
    <v-row>
      <v-col>
        <!-- {{ user }} -->
        <v-select :items="groups" v-model="selectedGroup" density="comfortable" label="Группа" return-object item-title="name"></v-select>
        <div class="d-flex justify-space-around align-center py-4">
          <v-btn :disabled="is_loading" :loading="is_loading" @click="clientStore.IS_VISITED(current.id, 0);" color="red"
            size="x-large">X-Large Button</v-btn>
          <v-btn :disabled="is_loading" :loading="is_loading" @click="clientStore.IS_VISITED(current.id, 2);" color="orange"
            size="x-large">X-Large Button</v-btn>
          <v-btn :disabled="is_loading" :loading="is_loading" @click="clientStore.IS_VISITED(current.id, 1);" color="green"
            size="x-large">X-Large Button</v-btn>
        </div>
        <v-carousel v-model="current">
          <v-carousel-item v-for="item in clients" :key="item.id" :value="item">
            <v-sheet :color="color" height="100%" tile>
              <div class="d-flex fill-height justify-center align-center">
                <v-img cover :src = "item.src"> <div class="text-h2 text-center ">
                  {{ ' ' + item.first_name }}
                </div></v-img>
              </div>
            </v-sheet>
          </v-carousel-item>

        </v-carousel>


      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useClientStore } from "@/store/client";
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import axios from "axios";


const clientStore = useClientStore();
const userStore = useUserStore()
const { clients, is_loading } = storeToRefs(clientStore);
const { user } = storeToRefs(userStore);

const current = ref({});
const groups = ref([]);
const selectedGroup = ref({});


export default {
  data: () => ({

}),

  setup() {

    async function getGroups() {

      let { data } = await axios.get('http://localhost:8000/groups/employee/' + user.value.id)

      groups.value = data.rez;
      selectedGroup.value = groups.value[0]
    }

    onMounted(() => {
      let params = { page: 1 }
      clientStore.GET_CLIENTS(params).then(() => current.value = clients.value[0])
      // current.value=clients[0]

      getGroups()
    });

    watch(clients, () => {
      current.value = clients.value[0]
    });
    watch(selectedGroup, () => {
      clientStore.GET_CLIENTS_by_group(selectedGroup.value.id);
    });

    return {
      clients,
      clientStore,
      is_loading,
      current,
      groups,
      selectedGroup,
      user
    };
  },
}
</script>
<style >
.vuecal__event {background-color: rgba(76, 172, 175, 0.35);}
</style>
