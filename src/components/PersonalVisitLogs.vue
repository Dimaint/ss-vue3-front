<template lang="">
  <div>
    <vue-cal
    small
    :selected-date="moment()"
  :time-from="7 * 60"
  :time-to="22 * 60"
  :disable-views="['years', 'year', 'day', 'month']"
  hide-view-selector
  :events="calendarEvents">
</vue-cal>
{{calendarEvents}}
<!-- {{props.client}} -->
  </div>


</template>
<script >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from 'moment';
import { onMounted, watch, ref } from "vue";
import axios from 'axios'

export default {
  data: () => ({
    moment,
   }),
  components: { VueCal },

  props: ['client'],

setup(props){
  const calendarEvents = ref([ ])


    async function getSchedule() {

      let { data } = await axios.get('http://localhost:8000/visit-log/' + props.client.id)
        for(let el of data) {
          let day = moment(el.date).format('YYYY-MM-DD')
          let payload = {
          start: `${day} 7:00`,
          end: `${day} 23:00`,
          title: el.description,
          class: 'red-event',
        }
        if(el.is_visited) {
          payload.class =  'green-event'
        } else if (el.is_visited==false && el.is_reason) {
          payload.class =  'yellow-event'
        }
          calendarEvents.value.push(payload)
        }
        // console.log(calendarEvents.value)
        // console.log(data)
      }

    onMounted(() => {
      getSchedule();

    });
    watch(props, () => getSchedule());

    return {
      calendarEvents,
      props
    }
}
}




</script>
<style >
/* .vuecal__event {background-color: rgba(76, 172, 175, 0.35);} */
.red-event {background-color: rgba(245, 7, 7, 0.5);}
.yellow-event {background-color: rgba(245, 182, 7, 0.5);}
.green-event {background-color: rgba(7, 245, 98, 0.5);}
</style>
