<template>
  <div class='day'>
        
  </div>
</template>

<script>
import moment from 'moment'

export default {
  setup () {

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