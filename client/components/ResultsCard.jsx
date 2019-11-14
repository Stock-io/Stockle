import React, { Component } from 'react';

// the opening instructional card that pops up when a user signs up
// conditional rendering in MainContainer, only popping up on Day 1

const IntroCard = (props) => (

  <div id="resultsCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {
      document.getElementById('resultsCard').style.display = 'none'
    }}>x</button>
    Dummy results
  </div>

);

export default IntroCard;