import { reactive, readonly } from 'vue'
import { uuid } from '../utils'
import defaultData from '../default-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

class Store {
  constructor () {
    let data = this.data()
    this.state = reactive(data)
  }

  getState() {
    return readonly(this.state)
  }
}

class PlannerStore extends Store {
  data() {
    return {
        calendars: defaultData.calendars,
        scheduledEvents: defaultData.events
    }
  }

  isTimeAvailable (id, startTime, endTime) {
    let eventsInDay = this.state.scheduledEvents.filter(e => {
      return (e.id !== id) && moment(e.startTime).isSame(startTime, 'day')
    })

    let range = moment.range(startTime, endTime)

    for (var i = 0; i < eventsInDay.length; i++) {
      let eRange = moment.range(eventsInDay[i].startTime, eventsInDay[i].endTime)

      if (eRange.overlaps(range, { adjacent: false })) {
        return {
          overlap: eventsInDay[i],
          available: false
        }
      }
    }

    return {
      available: true
    }
  }

  editEvent (newEvent) {
    let e = this.state.scheduledEvents.find(e => e.id === newEvent.id)
    if (!e) {
      return false
    }

    if (this.isTimeAvailable(newEvent.id, newEvent.startTime, newEvent.endTime).available) {
      e.name = newEvent.name
      e.calendar = newEvent.calendar
      e.startTime = newEvent.startTime
      e.endTime = newEvent.endTime
      return true
    }
    return false

  }
  
  addEvent (eventData) {
    eventData.id = uuid()

    if (this.isTimeAvailable(eventData.id, eventData.startTime, eventData.endTime).available) {
      this.state.scheduledEvents.push(eventData)
      return true
    }

    return false
  }

  deleteEvent (eventID) {
    this.state.scheduledEvents = this.state.scheduledEvents.filter(e => {
      return e.id !== eventID
    })
  }

  editCalendar (calendarData) {
    let cal = this.state.calendars.find(c => c.id === calendarData.id)

    if (!cal) {
      return false
    }

    if (calendarData.name.trim().length === 0) {
      cal.name = 'Untitled'
    } else {
      cal.name = calendarData.name
    }

    return true
  }
}
export const store = new PlannerStore();