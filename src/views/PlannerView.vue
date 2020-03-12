<template>
  <div id='planner-header'>
    <div id='planner-title'>
      <h2> {{ state.startOfWeek.format('MMMM') }} </h2>
      <span> {{ state.startOfWeek.format('YYYY') }} </span>
    </div>
    <div id='planner-days'>
      <div id='planner-nav'>
        <div> 
          <button @click='changeWeek(-1)'> &lt; </button>
          <button @click='changeWeek(0)'> Today </button>
          <button @click='changeWeek(1)'> &gt; </button>
        </div>
      </div>
      <div v-for='i in 7' :key='i' class='planner-header__day' >
        <div
        :class="{'planner-header__day-today': state.startOfWeek.clone().add(i - 1, 'days').isSame(currentDate, 'day')}">
          <h2> {{ state.startOfWeek.clone().add(i - 1, 'days').format('D') }} </h2>
          <h3> {{ state.startOfWeek.clone().add(i - 1, 'days').format('ddd') }} </h3>
        </div>
      </div>
    </div>
  </div>
  <div id='planner-schedule'>
    <div id='schedule__sidebar'>
      <div class='schedule__hour' v-for='i in 23' :key='i'>
        <span> {{ moment(i, 'HH').format('h A') }} </span>
      </div>
    </div>
    <div id='schedule__view'>
      <day-display 
        v-for='i in 7' 
        :key='i' 
        :date="state.startOfWeek.clone().add(i - 1, 'days')" />
    </div>
  </div>
</template>

<script>
import { ref, reactive, onUnmounted } from 'vue'
import moment from 'moment'
import DayDisplay from '../components/DayDisplay.vue'

const useCurrentDate = () => {
  const currentDate = ref(moment())

  const updateDate = () => {
    currentDate.value = moment()
  } 

  const updateDateInterval = setInterval(updateDate, 1000)

  onUnmounted(() => {
    clearInterval(updateDateInterval)
  })


  return {
    currentDate
  }
}
export default {
  components: {
    DayDisplay,
  },
  setup () {
    const { currentDate } = useCurrentDate() 

    const state = reactive({
      startOfWeek: moment().day('Sunday')
    })

    const changeWeek = (dir) => {
      // dir: -1, 0, 1 (-1 = prev. 0 = current. 1 = next)
      if (dir === 0) {
        state.startOfWeek = moment().day('Sunday')
      } else {
        state.startOfWeek  = state.startOfWeek.clone().add(7 * dir, 'days')
      }
    }
    
    return {
      changeWeek,
      currentDate,
      moment,
      state
    }
    
  }
}
</script>

<style>
  #planner-header {
    background-color: #fff;
    width: 100%;
  }

  #planner-title {
    background-color: #74b9ff;
    color: white;
    height: 60px;
    padding-left: 30px;
  }

  #planner-title h2 {
    display: inline-block;
    font-size: 2em;
    font-weight: bold;
    line-height: 60px;
    margin-right: 10px;
  }

  #planner-title span {
    display: inline-block;
    font-size: 2em;
    padding: 10px 10px 10px 0;
  }
  
  #planner-days {
    border-bottom: 2px solid #eee;
    height: 60px;
    width: 100%;
  }


  #planner-nav, .planner-header__day {
    color: #333;
    float: left;
    height: 60px;
    position: relative;
    width: 12.5%;
  }


  .planner-header__day div, #planner-nav div {
    bottom: 15px;
    position: absolute;
  }

  .planner-header__day {
    border-right: 2px solid #eee;
  }

  #planner-nav {
    border-right: 2px solid #eee
  }

  #planner-nav div{
    bottom: 20px;
    left: 30px;
  }

  #planner-nav div button {
    margin-right: 3px;
  }

  .planner-header__day h2, .planner-header__day h3 {
    display: inline-block;
    text-transform: uppercase;
  }
  .planner-header__day h2 {
    font-size: 1.5em;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin: 0 3px;
    text-align: center;
    width: 30px;
  }

  .planner-header__day-today {
    color: #74b9ff;
  }

  .planner-header__day-today h2 {
    background-color: #74b9ff;
    border-radius: 5px;
    color: white;
  }

  #planner-schedule {
    height: calc(100vh - 120px);
    overflow: scroll;
    width: 100%;
  }

  #schedule__sidebar {
    background-color: #fff;
    border-right: 2px solid #eee;
    float: left;
    width: 12.5%;
  }
  
  .schedule__hour {
    border-bottom: 1px solid #eee;
    color: #ccc;
    font-size: 0.75em;
    height: 50px;
    padding-top: 43px;
    text-align: left;
  }

  #schedule-view {
    float: left;
    width: 87.5%;
  }
  .schedule__hour span {
    background-color: #fff;
    padding: 5px 5px 5px 30px;
  }

  .add-event, .edit-calendars {
    background-color: #55efc4;
    box-sizing: content-box;
    color: white;
    cursor: pointer;
    float: right;
    font-weight: bold;
    height: 20px;
    line-height: 20px;
    margin: 15px 30px 0 0;
    padding: 5px 10px;
  }

  .fade-enter-active {
    animation: fade 0.5s;
  }

  .fade-leave-active {
    animation: fade 0.2s reverse;
  }

  @keyframes fade {
    0% { opacity: 0%; }
    100% { opacity: 100% }
  }
</style>