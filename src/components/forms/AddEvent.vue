<template>
  <div class='popup-bg'>
    <div class='popup'>
      <div class='popup-header'>
        <h2> Add Event </h2>
        <span @click='close'> x </span>
      </div>
      <div class='popup-content'>
        <label> Calendar </label>
        <div 
          v-for='cal in state.calendars'
          :key='cal.id'
          class='calendar-list'
          :style='calendarStyle(cal)'
          @click='eventData.calendar = cal.id'
        >
          {{ cal.name }}
        </div>
        <label> Name </label>
        <input type='text' v-model='eventData.name' />
        <label> Date </label>
        <date-picker 
          @update='updateDate'
          :default-date='defaultDate'
        />
        <label> Start Time </label>
        <input type='time' 
          @change='changeTime("startTime", $event)'
          @blur='updateTimeDisplay("startTime", $event)'
          id='add-event__start-time'
        />
        <label> End Time </label>
        <input type='time' 
          @change='changeTime("endTime", $event)'
          @blur='updateTimeDisplay("endTime", $event)'
          id='add-event__end-time'
        />
      </div>
      <div class='popup-footer'>
        <p class='popup-error'> {{ formError }} </p>
        <div class='popup-footer__cancel' @click='close'> Cancel </div>
        <div class='popup-footer__confirm' @click='submit'> Confirm </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'
import { usePopupLogic } from '../../logic/popup-logic'
import { store } from '../../store'
import DatePicker from './DatePicker.vue'
export default {
  components: {
    DatePicker
  },
  props: {
    existingEvent: Object
  },
  setup (props, context) {

    const { close } = usePopupLogic('addEvent', context.emit)

    const formError = ref(null)
    const defaultDate = ref(null)
    
    const eventData = reactive({
      calendar: '01',
      name: '',
      startTime: moment(),
      endTime: moment()
    })

    if (props.existingEvent) {
      eventData.calendar = props.existingEvent.calendar
      eventData.name = props.existingEvent.name
      eventData.startTime = props.existingEvent.startTime
      eventData.endTime = props.existingEvent.endTime

      defaultDate.value = props.existingEvent.startTime.clone()
    }

    onMounted(() => {
      document.getElementById('add-event__start-time').value = eventData.startTime.format('HH:mm')
      document.getElementById('add-event__end-time').value = eventData.endTime.format('HH:mm')
    })

    const calendarStyle = (cal) => {
      if (eventData.calendar === cal.id) {
        return {
          'background-color': cal.color,
          'color': 'white',
          'font-weight': 'bold'
        }
      }
    }

    const changeTime = (property, evt) => {
      let hour = parseInt(evt.target.value.split(':')[0])
      let minutes = parseInt(evt.target.value.split(':')[1])

      eventData[property] = eventData[property].clone().hour(hour).minute(minutes)

    }

    const updateDate = (date) => {
      eventData.startTime = date.clone().set({
        'hour': eventData.startTime.hour(),
        'minute': eventData.startTime.minute()
      })

      eventData.endTime = date.clone().set({
        'hour': eventData.endTime.hour(),
        'minute': eventData.endTime.minute()
      })
    }

    const updateTimeDisplay = (property, evt) => {
      evt.target.value = eventData[property].format('HH:mm')
    }

    const submit = () => {
      // verify form
      if (eventData.name.trim().length === 0) {
        formError.value = 'Name cannot be empty'
        return
      }

      if (eventData.startTime.isAfter(eventData.endTime)) {
        formError.value = 'Event must start before it begins'
        return
      }
      
      formError.value = null

      // submit form 
      eventData.startTime.second(0)
      eventData.endTime.second(0)

      if (props.existingEvent) {
        let editEvent = { ...eventData }
        editEvent.id = props.existingEvent.id

        if (store.editEvent(editEvent)) {
          close()
        } else {
          formError.value = 'There is already an event during that time.'
        }
      } else {
        if (store.addEvent({
          ...eventData
        })) {
          // clear our event
          close()
          
        } else {
          formError.value = 'There is already an event during that time.'
        }
      }     
    }

    return {
      calendarStyle,
      changeTime,
      close,
      defaultDate,
      eventData,
      formError,
      state: store.getState(),
      submit,
      updateDate,
      updateTimeDisplay
    }
  }
}
</script>

<style src='../../styles/popup.css' scoped >
</style>
<style scoped>
  label {
    clear: both;
    display: block;
    font-size: 0.8em;
    font-weight: bold;
    margin: 10px 0;
  }

  input[type='text'] {
    font-size: 0.9em;
    outline: none;
    padding: 5px;
    width: 100%;
  }

  .time-input {
    font-family: inherit; 
    font-size: 0.8em;
  }
  .calendar-list {
    background-color: #eee;
    color: #ccc;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8em;
    margin-right: 5px;
    padding: 5px 10px;
  }
  

  .popup-error {
    color: #ff7675;
    font-size: 0.8em;
  }
  .popup-footer__cancel {
    color: #888;
    cursor: pointer;
    float: left;
    font-size: 0.9em;
    padding: 5px 0;
    text-decoration: underline;
  }

  .popup-footer__delete {
    background: #ff7675;
    color: white;
    float: right;
    margin-right: 5px;
    padding: 5px 10px;
  }

</style>