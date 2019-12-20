import React, { Component } from 'react';

// the Info Box is where the user's information is housed:
// Name, Cash Amount (score), and which day they're on

const InfoBox = (props) => (
  
  <div id="infoBox" className="innerBox">
    <p>${props.cash}</p>
    <p>Day {props.day + 1}</p>
  </div>

);

export default InfoBox;