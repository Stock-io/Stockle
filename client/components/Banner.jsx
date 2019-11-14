import React, { Component } from 'react';

const Banner = (props) => (
  
  <div id="bannerDiv">
    <header>stockle</header>
    <button id="logoutBtn" onClick={ () => props.logout()}>Log Out</button>
  </div>
  
);

export default Banner;