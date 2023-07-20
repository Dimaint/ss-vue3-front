<template>
  <v-row justify="center">
    <v-dialog v-model="props.avatar_dialog" persistent max-width="500" activator="parent">

      <v-card>
        <v-card-title>
          <span class="text-h5">{{ file.value }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-img :height="400" :src="props.avatar_img"></v-img>
              </v-col>
              <v-col cols="12">
                <v-file-input v-model="file" :rules="rules" accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar"></v-file-input>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="$emit('closeDialog')">
            Close
          </v-btn>
          <v-btn @click="save_avatar" color="blue-darken-1" variant="text">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";

export default {
  props: ['avatar_dialog', 'avatar_img', 'person_id', 'parent'],
  emits: ['closeDialog'],

  setup(props, ctx) {
    const file = ref({})
    console.log(props.parent)
    async function save_avatar() {
      try {
        let params = {
          fileType: `${props.parent}-avatar`,
          objectId: props.person_id
        }

        const form = new FormData();
        form.append("file", file.value[0]);

        let url = 'http://localhost:8000/files/upload'

        await axios({
          method: "post",
          url: url,
          data: form,
          params: params,
          headers: { "Content-Type": "multipart/form-data" },
        });
        ctx.emit('closeDialog')
      } catch (err) {
        console.log(err);
        notify({
          title: "Ошибка загрузки фото",
          text: err.message,
          type: 'error',
        });
      }

    }

    return {
      props,
      file,
      save_avatar
    }
  }

}
</script>

<style lang="">

</style>
