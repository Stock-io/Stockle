import React, { Component } from 'react';

// the holdings box will pull which stocks the user has purchased.
// awaiting how to access this information from backend

const HoldingsBox = (props) => (
  
  <div id="holdingsBox" className="innerBox darkInner">
    {/* the below are just placeholders.
    these will be filled in with actual holdings
    as populated by the user's information in the database,
    and fetched from our stocks API*/}
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
    <div class="holdings">DATABASE HOLDINGS</div>
  </div>

);

export default HoldingsBox;