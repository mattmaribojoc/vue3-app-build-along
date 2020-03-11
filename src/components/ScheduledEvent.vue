<template>
  <div class='event'>
  </div>
</template>

<script>
export default {
  setup () {

  }
}
</script>

<style scoped>
  .event {
    width: 100%;
    background-color: green;
    position: absolute;
    border-radius: 5px;
    padding: 20px 0 0 10%;
    overflow: hidden;
    cursor: grab;
  }

  @keyframes shake {
    0% { transform: translateX(0px) }
    25% { transform: translateX(-2px) }
    50% { transform: translateX(0px) }
    75% { transform: translateX(2px) }
  }
  .event-shake {
    animation: shake 0.15s infinite;
  }

  .event:before, .event:after {
      content: ' ';
      position: absolute;
      left: 0;
      height: 10px;
      width: 100%;
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%);
      background-size: 10px 10px;
    }

  .event:before {
    top: 0;
    cursor: n-resize;
  }

  .event:after {
    bottom: 0;
    cursor: s-resize;
  }

  h2 {
    font-size: 0.8em;
    font-weight: bold;
  }
  
  h3 {
    font-size: 0.75em;
    margin-top: 5px;
  }
</style>