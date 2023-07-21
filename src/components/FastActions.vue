<template>
  <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
    <v-slide-group-item v-for="(n, index) in list" :key="index" >
      <v-card color="grey-lighten-1" :class="['ma-4']" height="100" width="150" @click="clickAction(n)">
        <div class="d-flex fill-height align-center justify-center">
          <v-scale-transition>
            {{ n.title }}
            <!-- <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon> -->
          </v-scale-transition>
        </div>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()

    function clickAction(n) {
      if(n.type=='link') {
        router.push({ path: n.href })
      }
    }
    const list = [
      {
        title: 'test',
        href: '',
        type: 'btn'
      },
      {
        title: 'журнал',
        href: '/journal',
        type: 'link'
      },


    ]
    return {
      list,
      clickAction
    }
  }
}
</script>
<style lang="">

</style>
