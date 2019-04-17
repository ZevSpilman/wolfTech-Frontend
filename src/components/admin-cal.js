import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class MyCalendar extends Component {
  state = {
    appointments: []
  }

  componentDidMount(){
    this.fetchCal()
  }

  fetchCal = () => {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${"qirr9gr9gjve0htuddd0km5vlg@group.calendar.google.com"}/events?key=${"AIzaSyAcwW9L_zZ6n7Blb5NLq4J29x0-3wrRM34"}`)
    .then(r => r.json())
    .then(r => {
       let events = r.items.map(event => {
        return (
          {
            start: event.start.date || event.start.dateTime,
              end: event.end.date || event.end.dateTime,
              title: event.summary
          }
        )
      })
      this.setState({appointments: events})
      return events
    })
  }

  render(){
    return(
      <div className='admin-cal'>
        <BigCalendar
          localizer={localizer}
          events={this.state.appointments}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    )
  }
}

export default MyCalendar
