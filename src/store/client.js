import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientStore = defineStore('clients', {
  state: () => {
    return {
      clients: [],
      is_loading: false,
      total: 7
    }
  },
  actions: {
    async GET_CLIENTS(payload) {
      // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      let params ={limit: 7, page: payload?payload.page:1}
      this.is_loading = true;
      try {
        let {data}= await axios.get('http://localhost:8000/clients')
        // let {data}= await axios.get('http://localhost:8000/clients', {params: params})
        console.log(data)
        this.clients = data.rez
        this.total = data.total
      }catch(err) {
        console.log('err')
      }finally {
        this.is_loading = false;
      }
    },
  },
  getters: {
    // doubleCount: (state) => state.employee * 2,
  },
})
