import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user';
import moment from 'moment';
import { notify } from "@kyvg/vue3-notification";

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
      const userState = useUserStore();

      let params ={limit: 7, page: payload?payload.page:1}
      this.is_loading = true;
      try {
        // let {data}= await axios.get('http://localhost:8000/clients')
        let {data}= await axios.get('http://localhost:8000/clients', {params: params})
        console.log(data)
        this.clients = data.rez
        this.total = data.total
      }catch(err) {
        console.log(err)
        if(err.response.statusText=='Unauthorized'){
          userState.LOGOUT();
        }

      }finally {
        this.is_loading = false;
      }
    },
    async GET_CLIENTS_by_group(group_id) {
      const userState = useUserStore();

      // let params ={limit: 7, page: payload?payload.page:1}
      this.is_loading = true;
      try {
        // let {data}= await axios.get('http://localhost:8000/clients')
        let {data}= await axios.get('http://localhost:8000/clients/group/' + group_id)
        for await(let el of data.rez) {
          let params = {
            fileType: 'client-avatar'
          }
          let { data } = await axios.get('http://localhost:8000/files/' + el.id, {params: params})
          // if(data) {
            el['src'] = `data:${data.mimetype};base64,${data.b64}`
          // }
        }
        this.clients = data.rez
        this.total = data.total
      }catch(err) {
        console.log(err)
        if(err.response.statusText=='Unauthorized'){
          userState.LOGOUT();
        }

      }finally {
        this.is_loading = false;
      }
    },
    async IS_VISITED(client_id, status) {
      this.is_loading = true;
      console.log('IS_VISITED')

      let payload = {
        date: moment(),
        clientId: client_id,
        is_visited: true,
        is_reason: true,
        description: ""
      }
      if(status==0) {
        payload.is_visited = false;
        payload.is_reason = false;
      }
      if(status==2) {
        payload.is_visited = false;
        payload.is_reason = true;
        payload.description = 'reason';
      }
      try {

        let {data}= await axios.post('http://localhost:8000/visit-log', payload)
        console.log(data)
        if(data) {
          this.clients = this.clients.filter(el=>el.id!=data.clientId)
        }

        this.is_loading = false;
      } catch(err) {
        notify({
          title: err,
          type: 'error',
        });
      } finally {
        this.is_loading = false;
      }

    }
  },
  getters: {
    // doubleCount: (state) => state.employee * 2,
  },
})
