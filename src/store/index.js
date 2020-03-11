import { reactive, readonly } from 'vue'
import { uuid } from '../utils'
import defaultData from '../default-calendar'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

class Store {

}

class PlannerStore extends Store {
  data() {
    return {
        calendars: defaultData.calendars,
        scheduledEvents: defaultData.events
    }
  }
}
export const store = new PlannerStore();