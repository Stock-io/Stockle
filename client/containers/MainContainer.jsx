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

    // the following allow for conditional rendering of intro / results cards
    // this.opening = this.props.state.day == 1 ? <IntroCard /> : <div></div>;
    // this.results = this.props.state.day == 100 ? <ResultsCard /> : <div></div>;
  }
  render() {
    return(
      <div className="mainContainer">
          <InfoBox name={this.props.state.name} cash={this.props.state.cash} day={this.props.state.day}/>
          <HoldingsBox stocks={this.props.state.stocks}/>
          <ButtonBox />
          <GlobalBox />
          
          {/* the following elements are conditionally rendered for either
          the beginning of the game, or the end results */}
          {this.results}
          {this.opening}
      </div>
    )
  }
}

export default App;