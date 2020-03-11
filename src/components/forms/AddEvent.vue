<template>
  <div class='popup-bg'>
    <div class='popup'>
      <div class='popup-header'>
        
      </div>
      <div class='popup-content'>
        
      </div>
      <div class='popup-footer'>
        
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  setup () {
    return {
      
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