import React, { Component } from 'react';

// the ending results card that pops up when a user finishes the game
// conditional rendering in MainContainer, only popping up after final End Day

const IntroCard = (props) => (

  <div id="introCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {
      document.getElementById('introCard').style.display = 'none'
    }}>x</button>
    Welcome to Stockle.
  </div>

);

export default IntroCard;