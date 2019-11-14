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
    const result = this.props.state.day == 99 ? <ResultsCard maxProfit={this.props.maxProfit} maxProfitResult={this.props.maxProfitResult} /> : <div></div>
    return(
      <div className="mainContainer">
          {/* passing user cash value and current day into InfoBox */}
          <InfoBox
            cash={this.props.state.cash}
            day={this.props.state.day}
          />
          {/* passing user stocks array to HoldingBox */}
          <HoldingsBox stocks={this.props.state.stocks} />
          <ButtonBox selectStock={this.props.selectStock} />
          {/* passing selectedStock object to populate InnerStockBox */}
          <GlobalBox
            selectedStock={this.props.state.selectedStock}
            day={this.props.state.day}
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