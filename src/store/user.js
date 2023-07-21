import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from "@kyvg/vue3-notification";

import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      is_loading: false,
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  actions: {
    async LOGIN(payload) {
      this.is_loading = true;
      try {
        let {data}= await axios.post('http://localhost:8000/auth/login', payload)
        // console.log(data)
        // localStorage.setItem('user', JSON.stringify(data));
        this.GET_PROFILE(data)

        // router.push('/')
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
    async GET_PROFILE(auth) {
      axios.defaults.headers.common = {'Authorization': `Bearer ${auth.access_token}`}

      this.is_loading = true;
      try {
        let {data}= await axios.get('http://localhost:8000/auth/profile')
        console.log(auth)
        let {data:ava} = await axios.get('http://localhost:8000/files/'+auth.user_id)
        console.log(ava)
        data['avatar'] = `data:${ava.mimetype};base64,${ava.b64}`

        const userData = {...data, ...auth}
        localStorage.setItem('user', JSON.stringify(userData));
        this.user = userData;
        router.push('/')


      }catch(err) {
        console.log('err')
      }finally {
        this.is_loading = false;
      }
    },
    LOGOUT() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
  }
  },
  getters: {

  },
})
