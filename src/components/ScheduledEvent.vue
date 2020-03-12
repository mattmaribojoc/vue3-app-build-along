<template>
  <div class='event'>
   </div>
</template>

<script>
import moment from 'moment'
export default {
	props:
	setup () {
    return {

    }
	}
}
</script>

<style scoped>
  .event {
	background-color: green;
	border-radius: 5px;
	cursor: grab;
	overflow: hidden;
	padding: 20px 0 0 10%;
	position: absolute;
	width: 100%;
}

@keyframes shake {
    0% { 
      transform: translateX(0px)
    }
    25% { 
      transform: translateX(-2px) 
    }
    50% { 
      transform: translateX(0px)
    }
    75% { 
      transform: translateX(2px)
    }
}

.event-shake {
	animation: shake 0.15s infinite;
}

.event:before, .event:after {
	background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%);
	background-size: 10px 10px;
	content: ' ';
	height: 10px;
	left: 0;
	position: absolute;
	width: 100%;
}

.event:before {
	cursor: n-resize;
	top: 0;
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