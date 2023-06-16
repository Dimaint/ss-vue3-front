import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmployeeStore = defineStore('employees', {
  state: () => {
    return {
      employee: [],
      is_loading: false
    }
  },
  actions: {
    async GET_EMPLOYEES(payload) {
      let params ={_limit: 10, _page: payload.page}
      this.is_loading = true;
      try {
        let {data}= await axios.get('http://localhost:8008/employee', {params: params})
        console.log(data)
        this.employee = data
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
