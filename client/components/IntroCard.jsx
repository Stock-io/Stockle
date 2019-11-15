import React, { Component } from 'react';

// the ending results card that pops up when a user finishes the game
// conditional rendering in MainContainer, only popping up after final End Day

const IntroCard = (props) => (

  <div id="introCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {
      document.getElementById('introCard').style.display = 'none'
    }}>x</button>
    Welcome to Stockle.
    <p>Here's where the game instructions will go,
      <br/>explaining all of our functionality and how the user can learn about stocks</p>
  </div>

);

export default IntroCard;