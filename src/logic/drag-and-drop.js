import moment from 'moment'
import { store } from '../store'

export function useDragAndDrop (props) {
  const startDrag = (evt) => {
    if (evt.offsetY <= 15 || evt.target.offsetHeight - evt.offsetY <= 15) {
      evt.preventDefault()
      return
    }
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.setData('event', JSON.stringify(props.scheduledEvent))

    let schedule = document.getElementById('planner-schedule')
    let offset = evt.pageY - evt.target.offsetTop + schedule.scrollTop

    evt.dataTransfer.setData('offset', offset)
  }

  const dropEvent = (evt) => {
    let e = JSON.parse(evt.dataTransfer.getData('event'))
    let offset = parseInt(evt.dataTransfer.getData('offset'))
    let schedule = document.getElementById('planner-schedule')

    let mouseY = evt.clientY + schedule.scrollTop - offset
    
    let hour = Math.floor(mouseY / 50)
    let minutes = Math.round((mouseY - hour * 50) / 50 * 60)
    minutes = Math.round(minutes / 15) * 15

    let startTime = props.date.clone().hour(hour).minute(minutes)
    let duration = moment(e.endTime).diff(e.startTime)
    let endTime = startTime.clone().add(duration, 'ms')

    if (startTime.isSame(props.date, 'day') && endTime.clone().subtract(1, 'minute').isSame(props.date, 'day')) {
      store.editEvent({
        ...e,
        startTime,
        endTime
      })
    }
    
  }

  return {
    startDrag, 
    dropEvent
  }
}