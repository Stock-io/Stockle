import React, { Component } from 'react';

// a container to house any buttons we may want to include
// at present, it only contains a button to end the current day (turn)
 
const ButtonBox = (props) => (
  
  <div className="innerBox" id="buttonBox">
    <button id="end">End Day?</button>
  </div>

);

export default ButtonBox;