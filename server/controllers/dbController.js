const models = require('../models/stockleModel');
const fetch = require('node-fetch');

const dbController = {};

dbController.getAllStockData = (req, res, next) => {
  const snp50 = [
    /*0*/["Apple Inc.",	 "AAPL"],
    /*1*/["Microsoft Corporation",	 "MSFT"],
    /*2*/["Amazon.com Inc.",	 "AMZN"],
    /*3*/["Facebook Inc. Class A",	 "FB"],
    /*4*/["Berkshire Hathaway Inc. Class B",	 "BRK.B"],
    /*5*/["JPMorgan Chase & Co.",	 "JPM"],
    /*6*/["Alphabet Inc. Class C",	 "GOOG"],
    /*7*/["Alphabet Inc. Class A",	 "GOOGL"],
    /*8*/["Johnson & Johnson",	 "JNJ"],
    /*9*/["Exxon Mobil Corporation",	 "XOM"],
    /*10*/["Visa Inc. Class A",	 "V"],
    /*11*/["Procter & Gamble Company",	 "PG"],
    /*12*/["AT&T Inc.",	 "T"],
    /*13*/["Bank of America Corp",	 "BAC"],
    /*14*/["Intel Corporation",	 "INTC"],
    /*15*/["Home Depot Inc.",	 "HD"],
    /*16*/["Verizon Communications Inc.",	 "VZ"],
    /*17*/["Mastercard Incorporated Class A",	 "MA"],
    /*18*/["UnitedHealth Group Incorporated",	 "UNH"],
    /*19*/["Walt Disney Company",	 "DIS"],
    /*20*/["Chevron Corporation",	 "CVX"],
    /*21*/["Wells Fargo & Company",	 "WFC"],
    /*22*/["Merck & Co. Inc.",	 "MRK"],
    /*23*/["Cisco Systems Inc.",	 "CSCO"],
    /*24*/["Pfizer Inc.",	 "PFE"],
    /*25*/["Comcast Corporation Class A",	 "CMCSA"],
    /*26*/["Coca-Cola Company",	 "KO"],
    /*27*/["Boeing Company",	 "BA"],
    /*28*/["PepsiCo Inc.",	 "PEP"],
    /*29*/["Citigroup Inc.",	 "C"],
    /*30*/["Walmart Inc.",	 "WMT"],
    /*31*/["Abbott Laboratories",	 "ABT"],
    /*32*/["McDonald's Corporation",	 "MCD"],
    /*33*/["Medtronic Plc",	 "MDT"],
    /*34*/["Adobe Inc.",	 "ADBE"],
    /*35*/["salesforce.com inc.",	 "CRM"],
    /*36*/["Costco Wholesale Corporation",	 "COST"],
    /*37*/["Amgen Inc.",	 "AMGN"],
    /*38*/["Honeywell International Inc.",	 "HON"],
    /*39*/["Philip Morris International Inc.",	 "PM"],
    /*40*/["Netflix Inc.",	 "NFLX"],
    /*41*/["NVIDIA Corporation",	 "NVDA"],
    /*42*/["Union Pacific Corporation",	 "UNP"],
    /*43*/["Broadcom Inc.",	 "AVGO"],
    /*44*/["Oracle Corporation",	 "ORCL"],
    /*45*/["International Business Machines Corporation",	 "IBM"],
    /*46*/["AbbVie Inc.",	 "ABBV"],
    /*47*/["United Technologies Corporation",	 "UTX"],
    /*48*/["Accenture Plc Class A",	 "ACN"],
    /*49*/["PayPal Holdings Inc",	 "PYPL"],
  ];

  console.log('Should be "50", actual is >> ', snp50);
  for (let i = 45; i < 50; i++) {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${snp50[i][1]}&outputsize=compact&apikey=VRFP7Q7L5C1DU3EH`
    )
    .then(result => result.json())
    .then(result => {
      // ***** New Build ***** // 
      const fullStock = [];
      for (let key in result['Time Series (Daily)']) {
        let stockObj = {};
        stockObj.date = key;
        stockObj.price = result['Time Series (Daily)'][key]['2. high'];
        fullStock.push(stockObj);
      }
      models.StockPrices.create({
        name: snp50[i][1],
        date_price: fullStock,
      }).then(result => {
        console.log('*Austin* Saved to DB >> ', result);
        res.locals.pastStock = result;
        return next();
      });
    })
    .catch(err => console.log(err));
  }
  
};

dbController.buyUserStock = (req, res, next) => {
  return next();
};

dbController.sellUserStock = (req, res, next) => {
  return next();
};

module.exports = dbController;