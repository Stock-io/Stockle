import React, { Component } from 'react';

//Banner contains log out button, which wipes state thus conditionally rendering the login page

const Banner = (props) => (
  
  <div id="bannerDiv">
    <header>stockle</header>
    <button id="logoutBtn" onClick={ () => props.logout() }>Log Out</button>
  </div>
  
);

export default Banner;