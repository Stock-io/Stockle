import React, { Component } from 'react';

import InfoBox from '../components/InfoBox.jsx';
import HoldingsBox from '../components/HoldingsBox.jsx';
import ButtonBox from '../components/ButtonBox.jsx';
import GlobalBox from '../components/GlobalBox.jsx';
import IntroCard from '../components/IntroCard.jsx';
import ResultsCard from '../components/ResultsCard.jsx';

// the Main Container is the UI for actual gameplay
// we'll need to pass down user information as props from the database
// awaiting backend to know how to access

class App extends Component {
  constructor(props) {
    super(props);

    // conditionals for intro card and results card
    // this.opening = this.props.state.day === 0 ? <IntroCard /> : <div></div>;
    // this.results = this.props.state.day === 100 ? <ResultsCard /> : <div></div>;
  }
  render() {
    // conditional rendering for the ResultsCard
    // Note: this.props.state.day is hardcoded to 99
    const result = this.props.state.day == 99 ? <ResultsCard singleTradeMaxProfit={this.props.singleTradeMaxProfit} singleTradeMaxProfitResult={this.props.singleTradeMaxProfitResult} singleTradeMinProfit={this.props.singleTradeMinProfit} singleTradeMinProfitResult={this.props.singleTradeMinProfitResult} multiTradeMaxProfit={this.props.multiTradeMaxProfit} multiTradeMaxProfitResult={this.props.multiTradeMaxProfitResult} multiTradeMinProfit={this.props.multiTradeMinProfit} multiTradeMinProfitResult={this.props.multiTradeMinProfitResult} SMA={this.props.SMA} twentyDayMovingAvgResult={this.props.twentyDayMovingAvgResult} fiftyDayMovingAvgResult={this.props.fiftyDayMovingAvgResult} applePrices={this.props.applePrices}/> : <div></div>
    return(
      <div className="mainContainer">
          {/* passing user cash value and current day into InfoBox */}
          <InfoBox
            cash={this.props.state.cash}
            day={this.props.state.day}
          />
          {/* passing user stocks array to HoldingBox */}
          <HoldingsBox
            day={this.props.state.day}
            stocks={this.props.state.stocks}
            selectStock={this.props.selectStock}
          />
          <ButtonBox endDay={this.props.endDay}/>
          {/* passing selectedStock object to populate InnerStockBox */}
          <GlobalBox
            selectedStock={this.props.state.selectedStock}
            day={this.props.state.day}
            tempQuantity={this.props.state.tempQuantity}
            totalValue={this.props.state.totalValue}
            selectedStockName={this.props.state.selectedStockName}
            selectStock={this.props.selectStock}
            exitSelect={this.props.exitSelect}
            calculateTotal={this.props.calculateTotal}
            buyStock={this.props.buyStock}
            sellStock={this.props.sellStock}
          />
          
          {/* the following elements are conditionally rendered for either
          the beginning of the game, or the end results */}
          {result}
          {this.opening}
      </div>
    )
  }
}

export default App;