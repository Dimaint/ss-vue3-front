<template>
  <v-container>
    <avatar-dialog :avatar_dialog="avatar_dialog" :avatar_img="employee.src" :person_id="route.params.id" :parent="'employee'"
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
          <!-- <div><v-img :max-width="150" aspect-ratio="1/1" cover src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </div> -->
          <div><v-img :max-width="150" aspect-ratio="1/1" cover :src="employee?employee.src:require('@/assets/avatar.png')"></v-img>
          </div>
          <v-btn v-if ="user.id==employee.id||user.id==3" variant="tonal" size="small" class="my-2" @click="openDialog">change avatar</v-btn>
          <p>{{ avatar_dialog }}</p>
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
import GroupList from '../components/GroupList.vue'
import AvatarDialog from '../components/AvatarDialog.vue'
import imgUrl from '@/assets/avatar.png'

import { useUserStore } from '@/store/user';
import { storeToRefs } from "pinia";

export default {
  components: {
    GroupList,
    AvatarDialog
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const employee = ref({});
    const activeTab = ref({});
    const avatar_dialog = ref(false);
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    const items = [
      { id: 1, text: 'БИО', icon: 'mdi-account' },
      { id: 2, text: 'Группы', icon: 'mdi-account-group-outline' },
      { id: 3, text: 'Conversions', icon: 'mdi-flag' },
    ];

    async function getEmployee() {
      let { data } = await axios.get('http://localhost:8000/employee/' + route.params.id)
      employee.value = data
    }

    function openDialog() {
      avatar_dialog.value = true
    }
    function closeDialog() {
      avatar_dialog.value = false
    }

    async function getAvatar() {
      let { data } = await axios.get('http://localhost:8000/files/' + route.params.id)
      if(data) {
        employee.value['src'] = `data:${data.mimetype};base64,${data.b64}`
      } else {
        employee.value['src'] = imgUrl
      }

    }

    onMounted(() => {
      getEmployee();
      getAvatar();
      activeTab.value = items[0]
    });
    watch(route, () => console.log('route.params'));
    return {
      employee,
      router,
      moment,
      items,
      activeTab,
      avatar_dialog,
      openDialog,
      closeDialog,
      route,
      user
    }
  }
}
</script>

<style  scoped>
.v-card {
  border-width: 1px !important;
}
</style>
