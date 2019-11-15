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
    }
  }

  // Asks for data from each stock to be then manipluated and be inserted below
  componentDidMount() {
    const tradingValues = [];
    const delta = [];
    // async() => {
      for (let i = 0; i < this.props.stocks.length; i++) {
        fetch(`/db/stock/${this.props.stocks[i].name}`)
        .then(response => response.json())
        .then(stock => {
          tradingValues.push(stock.date_price[this.props.day].price);
          if (this.props.day !== 0) {
            let difference = (stock.date_price[this.props.day].price - stock.date_price[this.props.day - 1].price).toString();
            if (difference[0] === '-') delta.push(difference)
            else delta.push('+' + difference);
          } else {
            delta.push('-');
          }
        })
        .catch(err => console.log('Error for componentDidMount in HoldingsBox: ', err))
      }
    // }
    this.setState({
      tradingValues:tradingValues,
      delta:delta
    });
  }

  // populates from the state.stocks array
  render() {
    return (
      <div id="holdingsBox" className="innerBox darkInner">
        {this.props.stocks.map((el, i) => {
          return (<div key={i} className="holdings" onClick={ () => this.props.selectStock(el.name) }>
            {el.name}
            <div className="valueItems">Valued ${el.avg_value} | Owned: {el.amount_owned} | Trading Value ${this.state.tradingValues[i]} | Delta: {this.state.delta[i]}</div>
          </div>)
        })}
      </div>
    );
  }
}
export default HoldingsBox;