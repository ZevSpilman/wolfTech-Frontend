import React from "react";
import ReactDOM from 'react-dom';
import { MDBRow } from "mdbreact";

class Tiles extends React.Component {
  constructor() {
    super();

    this.MasonryRef = React.createRef();
  }

  componentDidMount() {
    this.arrangeMasonry();
  }

  arrangeMasonry = () => {
    const numCols = 3;
    const colHeights = Array(numCols).fill(0);
    const container = ReactDOM.findDOMNode(this.MasonryRef.current);

    Array.from(container.children).forEach((child, i) => {
      const order = i % numCols;
      child.style.order = order;
      colHeights[order] += parseFloat(child.clientHeight);
    })
    container.style.height = Math.max(...colHeights) + 'px';
  }

  render() {
    return (
      <div className="masonry-with-flex" ref={this.MasonryRef}>
        <div style={{ order: 0 }} onClick={() => console.log("testing")}>
          Alerts
        </div>
        <div style={{ order: 1 }}>
          2
        </div>
        <div style={{ order: 2 }}>
          3
        </div>
      </div>
    );
  }
}
export default Tiles
