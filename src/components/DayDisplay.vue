<template>
  <div class='day'>
    <scheduled-event 
      v-for='e in state.daysEvents'
      :key='e.id'
      :scheduled-event='e'
      @dragover.prevent
      @dragenter.prevent
      @drop='dropEvent'
    />
    <div 
      class='hour'
      v-for='i in 24' 
      :key='i'
      @dragover.prevent
      @dragenter.prevent
      @drop='dropEvent'
    />
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import moment from 'moment'
import ScheduledEvent from './ScheduledEvent.vue'
import { store } from '../store/'
export default {
  props: {
    date: Object
  },
  components: {
    ScheduledEvent
  },
  setup (props) {
    const state = reactive({
      daysEvents: computed(() => {
        let state = store.getState()
        return state.scheduledEvents.filter(e => e.startTime.isSame(props.date, 'day'))
      })
    })

    const dropEvent = (evt) => {
      let e = JSON.parse(evt.dataTransfer.getData('event'))
      let offset = parseInt(evt.dataTransfer.getData('offset'))
      let schedule = document.getElementById('planner-schedule')

      let mouseY = evt.clientY + schedule.scrollTop - offset
      
      let hour = Math.floor(mouseY / 50)
      let minutes = Math.round((mouseY - hour * 50) / 50 * 60)
      minutes = Math.round(minutes / 15) * 15

      let startTime = props.date.clone().hour(hour).minute(minutes)
      let duration = moment(e.endTime).diff(e.startTime)
      let endTime = startTime.clone().add(duration, 'ms')

      if (startTime.isSame(props.date, 'day') && endTime.clone().subtract(1, 'minute').isSame(props.date, 'day')) {
        store.editEvent({
          ...e,
          startTime,
          endTime
        })
      }
      
    }

    return {
      dropEvent,
      state
    }
  }
}
</script>

<style scoped>
  .day {
    border-right: 2px solid #eee;
    float: left;
    position: relative;
    width: calc(87.5%/7);
  }

  .hour {
    border-bottom: 1px dashed #eee;
    height: 50px;
  }
</style>