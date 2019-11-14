import React, { Component } from 'react';

// the Inner Stock Box is what pops up when the user chooses a stock
// this populates with functionality to buy or sell certain stocks

const InnerStockBox = (props) => {

  return (
      <div id="innerStockBox" className="innerBox darkInner">
        {/* information regarding state's selectedStock object */}
        <button id="innerClose" onClick={ () => props.exitSelect() }></button>
        <p>{props.selectedStockName}</p>
        <p>{props.selectedStock.price}</p>

        {/* purchasing value and information
        the amount the user wants to purchase is calculate onChange
        buyStock and sellStock methods have heavy conditions regarding state
        */}
        <p style={{fontSize:'10pt'}}>How much do you want to purchase?</p>
        <input type="text" id="purchaseAmount" onChange={ (e) => {
              props.calculateTotal({ value: props.selectedStock.price, quantity: e.target.value });
            }}></input>
        <p>{props.totalValue}</p>
        <div style={{display:'flex',margin:'15px auto'}}>

          <button id="sellBtn" className="buyBtn" 
            onClick={ () => {
              document.getElementById('purchaseAmount').value = '';
              props.sellStock({ name: props.selectedStockName, value: props.selectedStock.price, quantity: props.tempQuantity })
              }}>SELL</button>
            
          <button id="buyBtn" className="buyBtn"
            onClick={ () => {
              document.getElementById('purchaseAmount').value = '';
              props.buyStock({ name: props.selectedStockName, value: props.selectedStock.price, quantity: props.tempQuantity })
            }}>BUY</button>
        </div>
      </div>
  );

};

export default InnerStockBox;