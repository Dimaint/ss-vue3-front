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

setup(){
  const calendarEvents = ref([ ])


    async function getSchedule() {

      let { data } = await axios.get('http://localhost:8000/schedules/' + '1')
        for(let el of data.scheduleDays) {
          let day = moment().day(el.weekDay).format('YYYY-MM-DD')
          calendarEvents.value.push({
          start: `${day} ${el.startTime}`,
          end: `${day} ${el.endTime}`,
          title: el.name,
        })
        }
        console.log(data)
      }

    onMounted(() => {
      getSchedule();

    });

    return {
      calendarEvents
    }
}
}




</script>
<style >
.vuecal__event {background-color: rgba(76, 172, 175, 0.35);}
</style>
