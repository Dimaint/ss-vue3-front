import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user';



export const useEmployeeStore = defineStore('employees', {

  state: () => {
    return {
      employee: [],
      is_loading: false,
      total: 7
    }
  },
  actions: {

    async GET_EMPLOYEES(payload) {
      const userState = useUserStore();

      let params ={limit: 7, page: payload?payload.page:1}
      this.is_loading = true;
      try {
        // let {data}= await axios.get('http://localhost:8000/employee', {params: params})
        let {data}= await axios.get('http://localhost:8000/employee', {params: params})
        console.log(data)
        this.employee = data.rez
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
  },
  getters: {
    // doubleCount: (state) => state.employee * 2,
  },
})
