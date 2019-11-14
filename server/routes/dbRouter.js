const express = require('express');
const dbController = require('../controllers/dbController');
const router = express.Router();

// ***** Only Used to Initially Set Up DB ***** //
// router.get('/stockSetUp', dbController.getAllStockData, (req, res) => {
//   res.status(200).json('Db Successfully Stored Session Data');
// });


// ***** When a User buys a stock ***** //
router.put('/buyStock', dbController.buyUserStock, (req, res) => {
  res.status(200).json(res.locals.stock);
})


// ***** When a User sells a stock ***** //
router.put('/sellStock', dbController.sellUserStock, (req, res) => {
  res.status(200).json(res.locals.stock);
})


// ***** Return a Stock's info ***** //
router.get('/stock/:name', dbController.getSingleStock, (req, res) => {
  res.status(200).json(res.locals.stock);
})


// ***** Get User information ***** //
router.get('/user/:user_id', dbController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
})


// ***** Return all Stock data for a given day ***** //
router.get('/:day', dbController.getAllStocks, (req, res) => {
  res.status(200).json(res.locals.stock);
})


// ***** 404 handler ***** //
router.use('/', (req, res) => {
  res.sendStatus(404);
})

module.exports = router;