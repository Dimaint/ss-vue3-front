<template >
 <v-container>
    <v-row class="pt-6">
      <v-col cols="9">fast actions  <v-sheet
    class="mx-auto"
    max-width="600"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 25"
        :key="n"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          class="ma-2"
          rounded
          :color="isSelected ? 'primary' : undefined"
          @click="toggle"
        >
          Options {{ n }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet></v-col>
      <v-col cols="3">ava</v-col>
    </v-row>
    <v-row>
      <v-col >
        personal events
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        all events
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>
