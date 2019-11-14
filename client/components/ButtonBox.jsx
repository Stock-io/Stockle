import React, { Component } from 'react';

// a container to house any buttons we may want to include
// at present, it only contains a button to end the current day (turn)

const ButtonBox = (props) => (
  
  // PLEASE NOTE, I'M USING THE END-DAY BUTTON TO TEST SELECTSTOCK FUNCTIONALITY.
  // THIS IS NOT WHERE IT WILL GO

  <div className="innerBox" id="buttonBox">
    <button id="endBtn">End Day?</button>
  </div>

);

export default ButtonBox;