import React, { Component } from 'react';

// the holdings box will pull which stocks the user has purchased.
// awaiting how to access this information from backend

class HoldingsBox extends Component {
  constructor(props) {
    super(props);


    // Local State
    // Variable Data
    this.state = {
      tradingValues: [],
      delta: [],
      flip: true,
    }
  }

  // Asks for data from each stock to be then manipluated and be inserted below
  componentDidMount() {
    const tradingValues = [];
    const delta = [];
      for (let i = 0; i < this.props.stocks.length; i++) {
        fetch(`/db/stock/${this.props.stocks[i].name}`)
        .then(response => response.json())
        .then(stock => {
          tradingValues.push(stock.date_price[this.props.day].price);
          if (this.props.day !== 0) {
            let difference = (stock.date_price[this.props.day].price - stock.date_price[this.props.day - 1].price).toFixed(2).toString();
            if (difference[0] === '-') delta.push(difference)
            else delta.push('+' + difference);
          } else {
            delta.push('-');
          }
        })
        .then(
          this.setState({
            tradingValues: tradingValues,
            delta: delta
          })
        )
        .catch(err => console.log('Error for componentDidMount in HoldingsBox: ', err))
      }
    
  }

  // populates from the state.stocks array
  render() {
    console.log(this.state)
    return (
      <div id="holdingsBox" className="innerBox darkInner">
        {this.props.stocks.map((el, i) => {
          return (<div key={i} className="holdings" onClick={ () => this.props.selectStock(el.name) }>
            {el.name}
            <div className="valueItems">Valued ${el.avg_value} | Owned: {el.amount_owned} | Trading Value ${this.state.tradingValues[i]} | Delta: {this.state.delta[i]}</div>
          </div>)
        })}
        {this.props.toggle}
      </div>
    );
  }
}
export default HoldingsBox;