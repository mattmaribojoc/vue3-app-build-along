<template>
  <div>
    <select ref='month' @change='changeDate("months", $event)'>
      <option 
        v-for='month in months'
        :key='month'
        :val='month'
      >
        {{ month }}
      </option>
    </select>
    <select ref='date' @change='changeDate("date", $event)'>
      <option 
        v-for='i in daysInMonth'
        :key='i'
        :val='i'
      >
        {{ i }}
      </option>
    </select>
    <select ref='year' @change='changeDate("year", $event)'>
      <option 
        v-for='i in 20'
        :key='i'
        :val='2010 + i'
      >
        {{ 2010 + i }}
      </option>
    </select>
    <div class='date-time__today' @click='jumpToToday'> Today </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import moment from 'moment'

export default {
  setup (props, { emit }) {
    const month = ref(null)
    const date = ref(null)
    const year = ref(null)

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    var dateValue = moment()
    const daysInMonth = ref(dateValue.daysInMonth())

    const updateDisplay = () => {
      month.value.value = dateValue.format('MMMM')
      date.value.value = dateValue.date()
      year.value.value = dateValue.year()
      daysInMonth.value = dateValue.daysInMonth()
    }

    onMounted(() => {
      updateDisplay()
    })

    const changeDate = (unit, evt) => {
      dateValue.set(unit, evt.target.value)
      emit('update', dateValue)
      updateDisplay()
    }

    const jumpToToday = () => {
      dateValue = moment()
      emit('update', dateValue)
      updateDisplay()
    }
    return {
      month, 
      date,
      year,
      months,
      daysInMonth,
      changeDate,
      jumpToToday
    }
  }
}
</script>
<style scoped>
  select {
    font-family: inherit; 
    font-size: 0.8em;
    margin-right: 5px;
  }

  .date-time__today {
    cursor: pointer;
    float: right;
    font-size: 0.8em;
    line-height: 18px;
    text-decoration: underline;
  }

</style>