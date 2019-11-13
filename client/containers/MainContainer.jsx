import React, { Component } from 'react';

import InfoBox from '../components/InfoBox.jsx';
import HoldingsBox from '../components/HoldingsBox.jsx';
import ButtonBox from '../components/ButtonBox.jsx';
import GlobalBox from '../components/GlobalBox.jsx';

// the Main Container is the UI for actual gameplay
// we'll need to pass down user information as props from the database
// awaiting backend to know how to access

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="mainContainer">
          <InfoBox />
          <HoldingsBox />
          <ButtonBox />
          <GlobalBox />
      </div>
    )
  }
}

export default App;