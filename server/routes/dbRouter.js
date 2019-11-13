const express = require('express');
const dbController = require('../controllers/dbController');
const router = express.Router();

router.get('/stockSetUp', dbController.getAllStockData, (req, res) => {
  res.status(200).json('Db Successfully Stored Session Data');
});

router.put('/buyStock', dbController.buyUserStock, (req, res) => {
  res.status(200).json(res.locals.stock);
})

router.put('/sellStock', dbController.sellUserStock, (req, res) => {
  res.status(200).json(res.locals.stock);
})

module.exports = router;