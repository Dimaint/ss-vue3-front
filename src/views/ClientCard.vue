<template >
  <v-container>
    <avatar-dialog :avatar_dialog="avatar_dialog" :avatar_img="client.src" :person_id="route.params.id" :parent="'client'"
      @close-dialog="closeDialog" />

    <v-row>
      <v-btn @click="router.go(-1)" size="x-small" icon="mdi-arrow-left"></v-btn>

    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto pa-2">
          <v-list density="compact" nav>
            <v-list-subheader>REPORTS{{ activeTab }}</v-list-subheader>

            <v-list-item v-for="(item, i) in items" :key="i" @click="activeTab = item" color="primary">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <group-list v-if="activeTab.id == 2" />
        <v-card v-if="activeTab.id == 1" class="mx-auto pa-4">
          <!-- <div><v-img :max-width="150" aspect-ratio="1/1" cover src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"></v-img>
    </div> -->
          <div><v-img :max-width="150" aspect-ratio="1/1" cover :src="client.src?client.src:'../assets/avatar'"></v-img>
          </div>
          <v-btn  variant="tonal" size="small" class="my-2" @click="openDialog">change avatar</v-btn>
          <p>{{ avatar_dialog }}</p>
          <!-- <p class="text-subtitle-1 ">Должность: <span class="font-weight-light">{{ employee.rank }}</span></p> -->
          <p class="text-subtitle-1 ">Фамилия: <span class="font-weight-light">{{ client.last_name }}</span></p>
          <p class="text-subtitle-1 ">Имя: <span class="font-weight-light">{{ client.first_name }}</span></p>
          <p class="text-subtitle-1 ">Отчество: <span class="font-weight-light">{{ client.middle_name }}</span></p>
          <p class="text-subtitle-1 ">День рождения: <span class="font-weight-light">{{
            client.birthday ? moment(client.birthday).format('ll') : '' }}</span></p>
          <p class="text-subtitle-1 ">Телефон: <span class="font-weight-light">{{ client.phone }}</span></p>
          <p class="text-subtitle-1 ">Группа: <span @click="" class="font-weight-light text-yellow-darken-4">{{ group.name
          }}</span></p>
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
import AvatarDialog from '../components/AvatarDialog.vue'
import imgUrl from '@/assets/avatar.png'

import { useUserStore } from './store/user';
import { storeToRefs } from "pinia";

export default {
  components: {
    AvatarDialog
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const client = ref({});
    const activeTab = ref({});
    const group = ref({});
    const avatar_dialog = ref(false);
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const items = [
      { id: 1, text: 'БИО', icon: 'mdi-account' },
      { id: 2, text: 'Расписание', icon: 'mdi-calendar-account-outline' },
      { id: 3, text: 'Журнал', icon: 'mdi-flag' },
    ];

    async function getClient() {
      let { data } = await axios.get('http://localhost:8000/clients/' + route.params.id)
      client.value = data;

      getClientGroup();
    }

    async function getAvatar() {
      let params = {
        fileType: 'client-avatar'
      }
      let { data } = await axios.get('http://localhost:8000/files/' + route.params.id, {params: params})
      if(data) {
        client.value['src'] = `data:${data.mimetype};base64,${data.b64}`
      } else {
        client.value['src'] = imgUrl
      }

    }
    async function getClientGroup() {
      let { data } = await axios.get('http://localhost:8000/groups/' + client.value.groupId)
      group.value = data
    }
    function openDialog() {
      avatar_dialog.value = true
    }
    function closeDialog() {
      avatar_dialog.value = false
    }
    onMounted(() => {

      getClient();
      getAvatar();
      activeTab.value = items[0];
    });
    watch(route, () => console.log('route.params'));

    return {
      client,
      router,
      moment,
      items,
      activeTab,
      group,
      avatar_dialog,
      openDialog,
      closeDialog,
      route,
      user
    }
  }
}
</script>
<style lang="">

</style>
