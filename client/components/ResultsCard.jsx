import React, { Component } from 'react';

// the opening instructional card that pops up when a user signs up
// conditional rendering in MainContainer, only popping up on Day 1

const IntroCard = (props) => (

  <div id="resultsCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {document.getElementById('resultsCard').style.display = 'none'}}>x</button>
    <button onClick={() => props.maxProfit([500, 501, 510, 515, 499, 502])}>max profit</button>
    <div> {props.maxProfitResult} </div> <br></br>
  </div>

);

export default IntroCard;