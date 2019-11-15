import React, { Component } from 'react';

// the opening instructional card that pops up when a user signs up
// conditional rendering in MainContainer, only popping up on Day 1

const IntroCard = (props) => (

  <div id="resultsCard" className="innerBox">
    <button id="closeBtn" onClick={ () => {document.getElementById('resultsCard').style.display = 'none'}}>x</button>

    <button onClick={() => props.singleTradeMaxProfit(props.applePrices)}>singleTradeMaxProfit</button>
    <div> {props.singleTradeMaxProfitResult} </div>

    <button onClick={() => props.singleTradeMinProfit(props.applePrices)}>singleTradeMinProfit</button>
    <div> {props.singleTradeMinProfitResult} </div>

    <button onClick={() => props.multiTradeMaxProfit(props.applePrices)}>multiTradeMaxProfit</button>
    <div> {props.multiTradeMaxProfitResult} </div>

    <button onClick={() => props.multiTradeMinProfit(props.applePrices)}>multiTradeMinProfit</button>
    <div> {props.multiTradeMinProfitResult} </div>

    <button onClick={() => props.SMA(props.applePrices, 20)}>twentyDayMovingAvg</button>
    <div> {props.twentyDayMovingAvgResult} </div>

    <button onClick={() => props.SMA(props.applePrices, 50)}>fiftyDayMovingAvg</button>
    <div> {props.fiftyDayMovingAvgResult} </div>

    <div style={{ color: 'green' }}>Good job</div>
    
  </div>

);

export default IntroCard;
