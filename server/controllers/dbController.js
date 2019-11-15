const models = require('../models/stockleModel');
const fetch = require('node-fetch');

const dbController = {};

// ***** Only Used to Initially Set Up DB ***** //
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


// ***** When a User buys a stock ***** //
dbController.buyUserStock = (req, res, next) => {
  const { user_id, name, avg_value, amount_owned, score } = req.body;
  if (!user_id) return res.status(400).json('No user_id given');
  if (!name) return res.status(400).json('No stock name given');
  if (!avg_value) return res.status(400).json('No stock avg_value given');
  if (!amount_owned) return res.status(400).json('No stock amount_owned given');
  if (!score) return res.status(400).json('No stock score given');
  models.User.findOne({user_id: user_id}, (err, user) => {
    let doesStockExist = false;
    for (let i = 0; i < user.stocks.length; i++) {
      if (user.stocks[i].name === name) {
        doesStockExist = true;
        user.stocks[i].avg_value = avg_value;
        user.stocks[i].amount_owned = amount_owned;
        break;
      }
    }
    if (doesStockExist) {
      models.User.findOneAndUpdate({user_id: user_id}, {stocks: user.stocks, score: score}, {new: true, useFindAndModify: false})
      .then(data => {
        res.locals.stock = data;
        return next()
      })
      .catch(err => next({
        message: 'Error in buyUserStock for findOneAndUpdate, stock does exist',
        err: err,
      }));
    } else {
      user.stocks.push({
        name,
        avg_value,
        amount_owned,
      })
      models.User.findOneAndUpdate({user_id: user_id}, {stocks: user.stocks, score: score}, {new: true, useFindAndModify: false})
      .then(data => {
        res.locals.stock = data;
        return next()
      })
      .catch(err => next({
        message: 'Error in buyUserStock for findOneAndUpdate, stock doesn\'t exist',
        err: err,
      }));
    }
  })
  .catch(err => next({
    message: 'Error in buyUserStock for findOne',
    err: err,
  }));
};


// ***** When a User sells a stock ***** //
dbController.sellUserStock = (req, res, next) => {
  const { user_id, name, avg_value, amount_owned, score } = req.body;
  if (!user_id) return res.status(400).json('No user_id given');
  if (!name) return res.status(400).json('No stock name given');
  if (!avg_value) return res.status(400).json('No stock avg_value given');
  if (amount_owned === undefined) return res.status(400).json('No stock amount_owned given');
  if (!score) return res.status(400).json('No stock score given');
  if (amount_owned === 0) { /* Check my type if not deleting properly */
    models.User.findOne({user_id: user_id}, (err, user) => {
      let stockIndex = null;
      for (let i = 0; i < user.stocks.length; i++) {
        if (user.stocks[i].name === name) {
          stockIndex = i;
          break;
        }
      }
      user.stocks.splice(stockIndex, 1);
      models.User.findOneAndUpdate({user_id: user_id}, {stocks: user.stocks, score: score}, {new: true, useFindAndModify: false})
      .then(data => {
        res.locals.stock = data;
        return next()
      })
      .catch(err => next({
        message: 'Error in sellUserStock for findOneAndUpdate, amount = 0',
        err: err,
      }));
    })
    .catch(err => next({
      message: 'Error in sellUserStock for findOne, amount = 0',
      err: err,
    }));
  } else {
    models.User.findOne({user_id: user_id}, (err, user) => {
      for (let i = 0; i < user.stocks.length; i++) {
        if (user.stocks[i].name === name) {
          user.stocks[i].avg_value = avg_value;
          user.stocks[i].amount_owned = amount_owned;
          break;
        }
      }
      models.User.findOneAndUpdate({user_id: user_id}, {stocks: user.stocks, score: score}, {new: true, useFindAndModify: false})
      .then(data => {
        res.locals.stock = data;
        return next()
      })
      .catch(err => next({
        message: 'Error in sellUserStock for findOneAndUpdate, amount is less',
        err: err,
      }));
    })
    .catch(err => next({
      message: 'Error in sellUserStock for findOne, amount is less',
      err: err,
    }));
  }
};


// ***** Return all Stock data for a given day ***** //
dbController.getAllStocks = (req, res, next) => {
  const { day } = req.params;
  models.User.find()
  .then(data => {

    return next();
  })
};


// ***** Return a Stock's info ***** //
dbController.getSingleStock = (req, res, next) => {
  const { name } = req.params;
  models.StockPrices.findOne({name: name})
  .then(data => {
    res.locals.stock = data;
    return next();
  })
  .catch(err => next({
    message: 'Error in getSingleStock for findOne',
    err: err,
  }));
};


// ***** Get User information ***** //
dbController.getUser = (req, res, next) => {
  const { user_id } = req.params;
  models.User.findOne({user_id: user_id})
  .then(data => {
    res.locals.user = data;
    return next();
  })
};

// ***** Set new User day ***** //
dbController.setUserDay = (req, res, next) => {
  const { newDay } = req.params;
  models.User.findOne({user_id: user_id})
  .then(data => {
    models.User.findOneAndUpdate({user_id: user_id}, {day: newDay}, {new: true, useFindAndModify: false})
    .then(data => {
      res.locals.stock = data;
      return next()
    })
    .catch(err => next({
      message: 'Error in setUserDay for findOneAndUpdate',
      err: err,
    }));
  })
  .catch(err => next({
    message: 'Error in setUserDay for findOne',
    err: err,
  }));
};

// ***** Return all Stock data ***** //
dbController.dbAll = (req, res, next) => {
  models.StockPrices.find()
  .then(data => {
    res.locals.stock = data;
    return next();
  })
};

module.exports = dbController;