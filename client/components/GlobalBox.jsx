import React, { Component } from 'react';

// the Global Box will typically house a list of stocks, using shortened ticker names
// when a stock is clicked, a secondary box will pop up in its place

const GlobalBox = (props) => {
  const snp50 = [
    ["Apple Inc.",	 "AAPL"],
    ["Microsoft Corporation",	 "MSFT"],
    ["Amazon.com Inc.",	 "AMZN"],
    ["Facebook Inc. Class A",	 "FB"],
    ["Berkshire Hathaway Inc. Class B",	 "BRK.B"],
    ["JPMorgan Chase & Co.",	 "JPM"],
    ["Alphabet Inc. Class C",	 "GOOG"],
    ["Alphabet Inc. Class A",	 "GOOGL"],
    ["Johnson & Johnson",	 "JNJ"],
    ["Exxon Mobil Corporation",	 "XOM"],
    ["Visa Inc. Class A",	 "V"],
    ["Procter & Gamble Company",	 "PG"],
    ["AT&T Inc.",	 "T"],
    ["Bank of America Corp",	 "BAC"],
    ["Intel Corporation",	 "INTC"],
    ["Home Depot Inc.",	 "HD"],
    ["Verizon Communications Inc.",	 "VZ"],
    ["Mastercard Incorporated Class A",	 "MA"],
    ["UnitedHealth Group Incorporated",	 "UNH"],
    ["Walt Disney Company",	 "DIS"],
    ["Chevron Corporation",	 "CVX"],
    ["Wells Fargo & Company",	 "WFC"],
    ["Merck & Co. Inc.",	 "MRK"],
    ["Cisco Systems Inc.",	 "CSCO"],
    ["Pfizer Inc.",	 "PFE"],
    ["Comcast Corporation Class A",	 "CMCSA"],
    ["Coca-Cola Company",	 "KO"],
    ["Boeing Company",	 "BA"],
    ["PepsiCo Inc.",	 "PEP"],
    ["Citigroup Inc.",	 "C"],
    ["Walmart Inc.",	 "WMT"],
    ["Abbott Laboratories",	 "ABT"],
    ["McDonald's Corporation",	 "MCD"],
    ["Medtronic Plc",	 "MDT"],
    ["Adobe Inc.",	 "ADBE"],
    ["salesforce.com inc.",	 "CRM"],
    ["Costco Wholesale Corporation",	 "COST"],
    ["Amgen Inc.",	 "AMGN"],
    ["Honeywell International Inc.",	 "HON"],
    ["Philip Morris International Inc.",	 "PM"],
    ["Netflix Inc.",	 "NFLX"],
    ["NVIDIA Corporation",	 "NVDA"],
    ["Union Pacific Corporation",	 "UNP"],
    ["Broadcom Inc.",	 "AVGO"],
    ["Oracle Corporation",	 "ORCL"],
    ["International Business Machines Corporation",	 "IBM"],
    ["AbbVie Inc.",	 "ABBV"],
    ["United Technologies Corporation",	 "UTX"],
    ["Accenture Plc Class A",	 "ACN"],
    ["PayPal Holdings Inc",	 "PYPL"],
    ["Thermo Fisher Scientific Inc.",	 "TMO"],
  ];

  // a hold for conditional rendering to display the Box for the user's chosen stock.
  // if('a' === 'a'){
  //   return (
  //     <div id="particularBox" className="innerBox darkInner">
  //       PARTICULAR STOCK DATA WILL GO HERE
  //     </div>
  //   );
  // }
  return (
    <div id="globalBox" className="innerBox darkInner">
      {snp50.map((el, i) => {
        return <div className="stockItem" key={i}>{el[1]}</div>
      })}
    </div>
  );
};


export default GlobalBox;