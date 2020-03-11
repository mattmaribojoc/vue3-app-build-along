import { uuid } from './utils'

export default {
  calendars: [
    {
      id: '01',
      name: 'School',
      color: '#ff7675'
    },
    {
      id: '02',
      name: 'Work',
      color: '#55efc4'
    },
    {
      id: '03',
      name: 'Untitled',
      color: '#a29bfe'
    },
    {
      id: '04',
      name: 'Untitled',
      color: '#74b9ff'
    }
  ],
  events: [
    {
      id: uuid(),
      name: 'Design Lecture',
      startTime: 'Mon Mar 09 2020 06:35:52 GMT-0500',
      endTime: 'Mon Mar 09 2020 10:05:52 GMT-0500',
      calendar: '01'
    },
    {
      id: uuid(),
      name: 'Homework',
      startTime: 'Wed Mar 11 2020 12:00 GMT-0500',
      endTime: 'Wed Mar 11 2020 14:20 GMT-0500',
      calendar: '01'
    }
  ]
}