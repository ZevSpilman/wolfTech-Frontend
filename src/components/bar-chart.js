import React, {Component} from 'react';
import BarChart from 'react-bar-chart';
import {connect} from 'react-redux';



function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const margin = {top: 20, right: 20, bottom: 30, left: 40};

class Chart extends Component{
    state = {
       width: 500,
       data: this.props.months
     }


  componentDidMount(){
      window.onresize = () => {
       this.setState({width: this.refs.root.offsetWidth});
    }
  }

  handleBarClick(element, id){
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  getMonthData = () => {
    if (this.props.residents[0]){
      let feb = 0
      let march = 0
      let april = 0
      let arrOfDates = this.props.residents.map(resident => parseISOString(resident.created_at))
      arrOfDates.forEach(date => {
        if (date.getMonth() == 1){
          feb += 1
        }
        else if (date.getMonth() == 2) {
          march += 1
        }
        else if (date.getMonth() == 3) {
          april += 1
        }
      })
      return [{text: 'Feb', value: feb}, {text: "March", value: march}, {text: "April", value: april}]
    }
    else{
      return []
    }
  }

  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}>
                <BarChart ylabel='Acquired Residents'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={this.getMonthData()}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {residents: state.residents}
}

export default connect(mapStateToProps)(Chart)
