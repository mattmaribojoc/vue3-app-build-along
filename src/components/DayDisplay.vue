<template>
  <div class='day'>
    <scheduled-event 
      v-for='e in state.daysEvents'
      :key='e.id'
      :scheduled-event='e'
    />
    <div class='hour' v-for='i in 24' :key='i' />
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

    return {
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