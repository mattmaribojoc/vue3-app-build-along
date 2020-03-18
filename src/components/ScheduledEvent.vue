<template>
  <div 
		class='event'
		:class='{"event-shake": scheduledEvent.shake}'
		:style='state.eventStyle'
		draggable
		@dragstart='startDrag'
		@mousedown='mouseDown'
		@dblclick='editEvent'
	>
		<h2> {{ scheduledEvent.name }} </h2>
		<h3> {{ scheduledEvent.startTime.format('h:mma') }}-{{ scheduledEvent.endTime.format('h:mma') }} </h3>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import moment from 'moment'
import { store } from '../store'
import { useDragAndDrop } from '../logic/drag-and-drop.js'
import { useResizeEvents } from '../logic/resize-events'
const convertTimeToPixels = (t) => {
	return (t.hour() + t.minute() / 60) * 50
}

export default {
	props: {
		scheduledEvent: Object
	},
	setup (props, { emit }) {

		const { startDrag } = useDragAndDrop(props)
		const { mouseDown } = useResizeEvents(props)
		const state = reactive({
			bgColor: computed(() => {
				let calendars = store.getState().calendars
				return calendars.find(c => c.id === props.scheduledEvent.calendar).color
			}),
			duration: computed(() => {
				const startTime = props.scheduledEvent.startTime
				const endTime = props.scheduledEvent.endTime
				return endTime.diff(startTime, 'hour') + (endTime.diff(startTime, 'minute') % 60) / 60
			}),
			eventStyle: computed(() => {
				return {
					'background-color': state.bgColor,
					'height': state.duration * 50 + 'px',
					'top': convertTimeToPixels(props.scheduledEvent.startTime) + 'px'
				}
			})
		})

		const editEvent = () => {
			emit('editEvent', props.scheduledEvent)
		}
    return {
			editEvent,
			mouseDown,
			startDrag,
			state
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