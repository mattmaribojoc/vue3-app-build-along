<template>
  <div id='planner-header'>
    <div id='planner-title'>
      
    </div>
    <div id='planner-days'>
      <div id='planner-nav'>
        
      </div>
      <div v-for='i in 7' :key='i' class='planner-header__day' >
        
      </div>
    </div>
  </div>
  <div id='planner-schedule'>
    <div id='schedule__sidebar'>

    </div>
    <div id='schedule__view'>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DayDisplay from '../components/DayDisplay.vue'

export default {
  components: {
    DayDisplay,
  },
  setup () {
    return {

    }
  }
}
</script>

<style>
  #planner-header {
    width: 100%;
    background-color: #fff;
  }

  #planner-title {
    height: 60px;
    padding-left: 30px;
    background-color: #74b9ff;
    color: white;
  }

  #planner-title h2 {
    line-height: 60px;
    margin-right: 10px;
    font-size: 2em;
    font-weight: bold;
    display: inline-block;
  }

  #planner-title span {
    padding: 10px 10px 10px 0;
    display: inline-block;
    font-size: 2em;
  }
  
  #planner-days {
    height: 60px;
    width: 100%;
    border-bottom: 2px solid #eee;
  }


  #planner-nav, .planner-header__day {
    float: left;
    height: 60px;
    position: relative;
    width: 12.5%;
    color: #333;
  }


  .planner-header__day div, #planner-nav div {
    position: absolute;
    bottom: 15px;
  }

  .planner-header__day {
    border-right: 2px solid #eee;
  }

  #planner-nav {
    border-right: 2px solid #eee
  }

  #planner-nav div{
    left: 30px;
    bottom: 20px;
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
    margin: 0 3px;
    width: 30px;
    line-height: 30px;
    height: 30px;
    font-weight: bold;
    text-align: center;
  }

  .planner-header__day-today {
    color: #74b9ff;
  }

  .planner-header__day-today h2 {
    background-color: #74b9ff;
    color: white;
    border-radius: 5px;
  }

  #planner-schedule {
    width: 100%;
    height: calc(100vh - 120px);
    overflow: scroll;
  }

  #schedule__sidebar {
    float: left;
    border-right: 2px solid #eee;
    width: 12.5%;
    background-color: #fff;
  }
  
  .schedule__hour {
    height: 50px;
    text-align: left;
    font-size: 0.75em;
    color: #ccc;
    padding-top: 43px;
    border-bottom: 1px solid #eee;
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
    float: right;
    height: 20px;
    background-color: #55efc4;
    color: white;
    margin: 15px 30px 0 0;
    padding: 5px 10px;
    font-weight: bold;
    box-sizing: content-box;
    line-height: 20px;
    cursor: pointer;
  }

  .fade-enter-active {
    animation: fade 0.5s;
  }

  .fade-leave-active {
    animation: fade 0.2s reverse;
  }

  @keyframes fade {
    0% { opacity: 0%; }
    100% {opacity: 100% }
  }
</style>