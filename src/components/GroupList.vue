<template >
  <div>
    <v-list v-model:opened="open">
        <!-- <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          ></v-list-item>

      </v-list-group>
        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Actions"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            :value="title"
            :title="title"
            :prepend-icon="icon"
          ></v-list-item>
        </v-list-group> -->
      <!-- </v-list-group> -->


        <v-list-group v-for="group in groups" :key="group.id" :value="group.id">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="group.name"
              @click-once="getClientsOfGroup(group.id)"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="item in clientsOfGroup(group.id)"
            :key="item.id"
            :value="title"
            :title="`${item.last_name}  ${item.first_name}`"
            :prepend-icon="icon"
          ></v-list-item>
        </v-list-group>
        <!-- <p>{{ open }}</p> -->
    </v-list>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { onMounted } from "vue";
import axios from 'axios'

export default {
    data: () => ({
      // open: [],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }),
    setup() {
    const route = useRoute();
    const router = useRouter();
    const groups = ref({})
    const clients = ref([])
    const open = ref([])


    async function getEmployee() {
      let { data } = await axios.get('http://localhost:8000/groups/employee/' + route.params.id)
      console.log(data)
      groups.value = data.rez
    }
    async function getClientsOfGroup(id) {
      let {data} = await axios.get('http://localhost:8000/groups/' + id)
      console.log(data)
      clients.value.push(data)
    }

    function clientsOfGroup (id) {
      let item = clients.value.find(el=>el.id==id)
      console.log('item'+item)
      return item?.client
    }

    onMounted(() => {

      getEmployee();

    });
    watch(route, () => console.log('route.params'));
    watch(open, (id) => console.log('open group changed'+ id) )
    return {
      groups,
      router,
      clientsOfGroup,
      open,
      getClientsOfGroup,
      clients
    }
  }
  }
</script>
<style lang="">

</style>
