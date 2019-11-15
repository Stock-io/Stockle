import React, { Component } from 'react';

// the opening instructional card that pops up when a user signs up
// conditional rendering in MainContainer, only popping up on Day 1

class ResultsCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const results = this.props.cash > 50000 ? <div style={{ color:'green'}}>Good job</div> : <div style={{color:'red'}}>Work harder</div>
    
    return (
      <div id="resultsCard" className="innerBox">
        <button id="closeBtn" onClick={ () => {document.getElementById('resultsCard').style.display = 'none'}}>x</button>

        <div className="metricsContainer">
          <button onClick={() => this.props.singleTradeMaxProfit(this.props.applePrices)}>singleTrade MaxProfit</button>
          <div> {this.props.singleTradeMaxProfitResult} </div>

          <button onClick={() => this.props.singleTradeMinProfit(this.props.applePrices)}>singleTrade MinProfit</button>
          <div> {this.props.singleTradeMinProfitResult} </div>

          <button onClick={() => this.props.multiTradeMaxProfit(this.props.applePrices)}>multiTrade MaxProfit</button>
          <div> {this.props.multiTradeMaxProfitResult} </div>

          <button onClick={() => this.props.multiTradeMinProfit(this.props.applePrices)}>multiTrade MinProfit</button>
          <div> {this.props.multiTradeMinProfitResult} </div>

          <button onClick={() => this.props.SMA(this.props.applePrices, 20)}>twentyDay MovingAvg</button>
          <div> {this.props.twentyDayMovingAvgResult} </div>

          <button onClick={() => this.props.SMA(this.props.applePrices, 50)}>fiftyDay MovingAvg</button>
          <div> {this.props.fiftyDayMovingAvgResult} </div>
        </div>
        
        {results}
        
      </div>
    )};
}
export default ResultsCard;
