import React, { Component } from 'react';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

// a container to house any buttons we may want to include
// at present, it only contains a button to end the current day (turn)

const ButtonBox = (props) => (
  
  // PLEASE NOTE, I'M USING THE END-DAY BUTTON TO TEST SELECTSTOCK FUNCTIONALITY.
  // THIS IS NOT WHERE IT WILL GO

  <div className="innerBox" id="buttonBox">
    <button id="endBtn" onClick={ () => props.selectStock() }>End Day?</button>
  </div>

);

export default ButtonBox;