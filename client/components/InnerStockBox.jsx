import React, { Component } from 'react';

// the Inner Stock Box is what pops up when the user chooses a stock
// this populates with functionality to buy or sell certain stocks

const InnerStockBox = (props) => {

  return (
      <div id="innerStockBox" className="innerBox darkInner">
        {/* information regarding state's selectedStock object */}
        <p>{props.selectedStock.name}</p>
        <p>{props.selectedStock.date_price[props.day].price}</p>

        {/* purchasing value and information */}
        <p style={{fontSize:'10pt'}}>How much do you want to purchase?</p>
        <input type="text" id="purchaseAmount"></input>
        <div style={{display:'flex',margin:'15px auto'}}>
          <button id="sellBtn" className="buyBtn">SELL</button>
          <button id="buyBtn" className="buyBtn">BUY</button>
        </div>
        <p>Total Value</p>
      </div>
  );

};

export default InnerStockBox;