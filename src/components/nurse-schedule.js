import React from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid } from 'react-agenda';

require('moment/locale/fr.js');

var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const add_minutes =  function (dt, minutes) {
  return new Date(dt.getTime() + minutes*70000);
}

var now = new Date();





export default class Agenda extends React.Component {
  constructor(props){
  super(props);
    this.state = {
      items: [],
      selected:[],
      cellHeight:30,
      showModal:false,
      locale:"en-gb",
      rowsPerHour:2,
      numberOfDays:3,
      startDate: new Date()
    }
  }



  componentDidMount(){
    let items = []
   // this.props.residents.forEach(resident =>{
   //    resident.appointments.forEach(appoinment => {
   //      items.push(
   //        {
   //          _id            :guid(),
   //           name          : resident.name + ":" + " " + appoinment.variation,
   //           startDateTime : parseISOString(appoinment.time),
   //           endDateTime   : add_minutes(parseISOString(appoinment.time), appoinment.duration),
   //           classes       : 'color-2 color-3'
   //        }
   //      )
   //    })
   //  })
    this.setState({items: this.props.appointments})
  }



  render() {
    console.log(this.props.appointments);
    console.log(this.state.items);
    return (
      <div className="schedule">
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={this.state.startDate}
          cellHeight={this.state.cellHeight}
          locale={this.state.locale}
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          />
      </div>
    );
  }
}
