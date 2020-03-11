<template>
  <div class='day'>
        
  </div>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style scoped>
  .day {
    float: left;
    width: calc(87.5%/7);
    position: relative;
    border-right: 2px solid #eee;
  }

  .hour {
    height: 50px;
    border-bottom: 1px dashed #eee;
  }
</style>