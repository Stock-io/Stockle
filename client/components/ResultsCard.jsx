import React, { Component } from 'react';

// the opening instructional card that pops up when a user signs up
// conditional rendering in MainContainer, only popping up on Day 1

const IntroCard = (props) => (

  <div id="resultsCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {document.getElementById('resultsCard').style.display = 'none'}}>x</button>

    <button onClick={() => props.singleTradeMaxProfit([500, 501, 510, 515, 499, 502, 501])}>singleTradeMaxProfit</button>
    <div> {props.singleTradeMaxProfitResult} </div>

    <button onClick={() => props.singleTradeMinProfit([500, 501, 510, 515, 499, 502, 501])}>singleTradeMinProfit</button>
    <div> {props.singleTradeMinProfitResult} </div>

    <button onClick={() => props.multiTradeMaxProfit([500, 501, 510, 515, 499, 502, 501])}>multiTradeMaxProfit</button>
    <div> {props.multiTradeMaxProfitResult} </div>

    <button onClick={() => props.multiTradeMinProfit([500, 501, 510, 515, 499, 502, 501])}>multiTradeMinProfit</button>
    <div> {props.multiTradeMinProfitResult} </div>

    <button onClick={() => props.sevenDayMovingAvg([500, 501, 510, 515, 499, 502, 501])}>sevenDayMovingAvg</button>
    <div> {props.sevenDayMovingAvgResult} </div>
  </div>

);

export default IntroCard;