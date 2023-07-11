import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      is_loading: false,
      token: '',
      user_name: ''
    }
  },
  actions: {
    async LOGIN(payload) {
      this.is_loading = true;
      try {
        let {data}= await axios.post('http://localhost:8000/auth/login', payload)
        console.log(data)
        this.GET_PROFILE(data.access_token)
      }catch(err) {
        console.log(err)

        notify({
          title: "Ошибка авторизации",
          type: 'error',
        });
      }finally {
        this.is_loading = false;
      }
    },
    async GET_PROFILE(token) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      // console.log(axios.defaults.headers)
      // console.log('GET_PROFILE')
      this.is_loading = true;
      try {
        let {data}= await axios.get('http://localhost:8000/auth/profile')

        console.log(data)

        console.log(data.exp-data.iat)
      }catch(err) {
        console.log('err')
      }finally {
        this.is_loading = false;
      }
    }
  },
  getters: {

  },
})
