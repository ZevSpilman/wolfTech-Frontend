import React, {Component} from 'react';
import BarChart from 'react-bar-chart';



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

  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}>
                <BarChart ylabel='Acquired Residents'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={this.state.data}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
}

export default Chart
