const mongoose = require('mongoose');

const MONGO_URI_ATLAS = 'mongodb+srv://aburkett:Yc+_t7N-SM9Q@bL@stockle-wnxbs.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI_ATLAS, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'stockleDB'
})
.then(()=>console.log('Connected to Stockle DB.'))
.catch(err=>console.log(err));

const Schema = mongoose.Schema;

const UserStocksSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  amount_owned: {
    type: Number,
    require: true,
  },
  avg_value: {
    type: Number,
    require: true,
  },
});

const UserStocks = mongoose.model('UserStocks', UserStocksSchema);

const UserSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  stocks: [UserStocksSchema],
  day: Number,
  score: Number,
});

const User = mongoose.model('User', UserSchema);

const StockSchema = new Schema({
  date: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

const Stock = mongoose.model('Stock', StockSchema);

const StockPricesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  date_price: {
    type: [StockSchema],
    require: true,
  },
});

const StockPrices = mongoose.model('StockPrices', StockPricesSchema);

module.exports = {
  User,
  UserStocks,
  StockPrices,
  Stock,
};