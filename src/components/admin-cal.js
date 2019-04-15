import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const myEventsList = [
    {
      allDay: false,
      end: new Date('April 19, 2019 10:13:00'),
      start: new Date('April 18, 2019 11:25:00'),
      title: 'hi',
    },
    {
      allDay: true,
      end: new Date('April 16, 2019 11:25:00'),
      start: new Date('April 16, 2019 11:11:00'),
      title: 'Community Outreach',
    },
  ];

const MyCalendar = props => (
  <div className='admin-cal'>
    <BigCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default MyCalendar
