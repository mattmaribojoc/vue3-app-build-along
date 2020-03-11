const moment = require('moment')

export function getStartOfWeek () {
  return moment().day('Sunday')
}