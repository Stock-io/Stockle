import React, { Component } from 'react';

// the holdings box will pull which stocks the user has purchased.
// awaiting how to access this information from backend

class HoldingsBox extends Component {
  constructor(props) {
    super(props);
    this.stocks = this.props.stocks
    this.selectStock = this.props.selectStock
  }
  // populates from the state.stocks array
  render() {
    return (
      <div id="holdingsBox" className="innerBox darkInner">
        {this.stocks.map((el, i) => {
          return <div key={i} className="holdings" onClick={ () => this.selectStock(el.name) }>
            {el.name}
            <div className="valueItems">Valued ${el.avg_value} | Owned: {el.amount_owned}</div>
          </div>
        })}
      </div>
    );
  }
}
export default HoldingsBox;