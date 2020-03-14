<template>
  <div class='day'>
    <scheduled-event 
      v-for='e in state.daysEvents'
      :key='e.id'
      :scheduled-event='e'
      @dragover.prevent
      @dragenter.prevent
      @drop='dropEvent'
      v-bind='$attrs'
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
import { useDragAndDrop } from '../logic/drag-and-drop.js'

export default {
  props: {
    date: Object
  },
  components: {
    ScheduledEvent
  },
  setup (props) {

    const { dropEvent } = useDragAndDrop(props)

    const state = reactive({
      daysEvents: computed(() => {
        let state = store.getState()
        return state.scheduledEvents.filter(e => e.startTime.isSame(props.date, 'day'))
      })
    })

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