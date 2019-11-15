import React, { Component } from 'react';
import axios from 'axios';

import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Banner from './components/Banner.jsx';
import Algo from './Algorithms.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Id: 'id',
      response: '',
      cash: 50000,
      day: 0,
      // state.stocks will populate HoldingsBox
      stocks: [],
      boughtCache: [],
      // to be set any time the user clicks a stock name
      // it will flip GlobalBox to InnerStockBox, populating with pertinent stock information
      totalValue: 0,
      tempQuantity: 0,
      // dummy data below
      selectedStockName: 'XXXX',
      selectedStock: {
        date: 'XX-XX-2019',
        price: '0000',
      },

      // result values for results card
      singleTradeMaxProfitResult: 0,
      singleTradeMinProfitResult: 0,
      multiTradeMaxProfitResult: 0,
      multiTradeMinProfitResult: 0,
      twentyDayMovingAvgResult: 0,
      fiftyDayMovingAvgResult: 0,

      applePrices: [],
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.endDay = this.endDay.bind(this);
    this.logout = this.logout.bind(this);

    this.selectStock = this.selectStock.bind(this);

    this.singleTradeMaxProfit = Algo.singleTradeMaxProfit.bind(this)
    this.singleTradeMinProfit = Algo.singleTradeMinProfit.bind(this);
    this.multiTradeMaxProfit = Algo.multiTradeMaxProfit.bind(this);
    this.multiTradeMinProfit = Algo.multiTradeMinProfit.bind(this);
    this.SMA = Algo.SMA.bind(this);

    this.resultsCalculations = this.resultsCalculations.bind(this);

    this.exitSelect = this.exitSelect.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.sellStock = this.sellStock.bind(this);
  }

  login(info){
    firebase.auth().signInWithEmailAndPassword(info.username, info.password)
    .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({response: errorMessage})
      // console.log('errors', errorCode, errorMessage)
    });

  }
  signUp(info) {
    if(!info.username || !info.password){
      this.setState({ response : 'Missing field' })
      return;
    }
    else { 
      this.setState({ response : ''}) 
      firebase.auth().createUserWithEmailAndPassword(info.username, info.password)
      .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // console.log('errors', errorCode, errorMessage)
      this.setState({response: errorMessage})
    });
      // .then(() => this.setState({day: 0, cash: 50000}))
    }
  }

  // logging out, or ending the day
  logout(){
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });    
    this.setState({ user_Id: ''})
    // , cash: 50000, day: 0, stocks: []
  }
  endDay = () => {
    this.setState(state => {
      return {
        day: state.day + 1
      }
    })
    axios.put('/db/endDay', {user_id: this.state.user_Id, newDay: this.state.day})
    .catch(err=> {
      if (err) {
        console.log(err)
      }
    })
  }

  // calculates the user's input for display, and then for buying/selling
  calculateTotal(totalObj) {
    const { value, quantity } = totalObj;
    let totalValue = Number((value * quantity).toFixed(2))
    let tempQuantity = Number(quantity)
    this.setState( { totalValue, tempQuantity } )
  }

  // methods for buying and selling stocks
  buyStock(purchase){
    const { name, value, quantity } = purchase;
    let boughtStock;
    // copying state
    const tempStocks = [...this.state.stocks]
    let cash = Number(this.state.cash);
    let boughtCache = [...this.state.boughtCache]
    // conditional for if you do not have enough money
    if(cash - this.state.totalValue < 0){
      this.setState({ totalValue: 'You\'re too poor!' })
      return;
    }
    // searching our user's stocks to see if we own any yet
    for(let i = 0; i < tempStocks.length; i++){
      if(tempStocks[i].name === name){
        boughtStock = tempStocks[i]
        break;
      }
      else if(i + 1 >= tempStocks.length) {
        boughtStock = { name: name, avg_value: value, amount_owned: 0 };
        boughtCache.push(name);
        tempStocks.push(boughtStock);
        break;
      }
    }
    if(!tempStocks.length) {
      boughtStock = { name: name, avg_value: value, amount_owned: 0 };
      boughtCache.push(name);
      tempStocks.push(boughtStock);
    }
    // updating quantity & cash to temporary stock
    cash = (cash - this.state.totalValue).toFixed(2);
    boughtStock.amount_owned += quantity;
    // updating state
    this.setState({ stocks: tempStocks, totalValue: '', cash, boughtCache })

    // FUTURE DB REQUEST:
    // axios.put(`http://localhost:8080/db/buyStock`, boughtStock)
    // .then(res => {
    //   if(!res){
    //     console.log(`You bought some ${name} stock`)
    //   }
    // })
  }
  sellStock(sale){
    const { name, value, quantity } = sale
    // copying state
    const tempStocks = [...this.state.stocks]
    let cash = Number(this.state.cash);
    // finding if we own any of this stock
    for(let i = 0; i < tempStocks.length; i++){
      // conditional for if you own this stock
      if(tempStocks[i].name === name) {
        if(tempStocks[i].amount_owned - quantity < 0){
          this.setState({ totalValue: 'You don\'t own that much!' })
          return;
        }
        tempStocks[i].amount_owned -= quantity;
        if(tempStocks[i].amount_owned === 0){
          tempStocks.splice(i, 1)
          console.log(this.state.boughtCache)
        }
        cash = (cash + this.state.totalValue).toFixed(2);
        this.setState({ stocks: tempStocks, totalValue: '', cash })
        break;
      }
      // conditional return for if you do not own this stock
      else if(i + 1 >= tempStocks.length) {
        this.setState({ totalValue: 'No Stock Owned!' })
        return;
      }
    }
  }
  
  // methods for selecting which stock to display in InnerStockBox,
  // upon clicking a stock name in GlobalBox or HoldingsBox

  selectStock(name) {
    axios.get(`http://localhost:8080/db/stock/${name}`)
    .then(res => {
      const selectedStock = res.data.date_price[this.state.day];
      this.setState({ selectedStock, selectedStockName: name });
    })
  }


  resultsCalculations() {
    axios.get('/db/stock/AAPL')
    .then(res => {
      const arr = res.data.date_price;

      const newArr = [];

      arr.forEach(el => {
        newArr.push(el.price);
      })
      console.log(arr);
      console.log(newArr);
      this.setState({ applePrices: newArr });
    })
  }

  
  
  exitSelect(){
    this.setState({ selectedStockName: 'XXXX' })
  }



  update = (user) => {
    if (user) {
      this.setState({user_Id: user.uid})
      axios.get(`/db/user/${user.uid}`)
      .then(resp => {
        if (resp.data){
          this.setState({cash: resp.data.score, day: resp.data.day, stocks: [...resp.data.stocks]})
        } else {
          axios.post('/sign/up', {user: user.uid})
          .catch(err => {
          if (err) console.log(err);
          })
        }
      })
      .catch(err => {if (err) {console.log(err)}})
      // axios.post('/sign/up', {user: user.uid})
  }
}

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.update);
  }


  // if not logged in, the landing page will render a login container
  // if logged in, it will conditionally render the UI

  render() {
    if(!this.state.user_Id){
      return(
        <div className="outerContainer">
          <Banner logout={this.logout} />
          <Login
            login={this.login}
            signUp={this.signUp}
            response={this.state.response}
          />
        </div>
      )
    }
    return(
      <div className="outerContainer">
        <Banner logout={this.logout} />
        <MainContainer 
          state={this.state}
          selectStock={this.selectStock}
          day={this.state.day}

          singleTradeMaxProfit={this.singleTradeMaxProfit}
          singleTradeMaxProfitResult={this.state.singleTradeMaxProfitResult}
          singleTradeMinProfit={this.singleTradeMinProfit}
          singleTradeMinProfitResult={this.state.singleTradeMinProfitResult}
          multiTradeMaxProfit={this.multiTradeMaxProfit}
          multiTradeMaxProfitResult={this.state.multiTradeMaxProfitResult}
          multiTradeMinProfit={this.multiTradeMinProfit}
          multiTradeMinProfitResult={this.state.multiTradeMinProfitResult}
          SMA={this.SMA}
          twentyDayMovingAvgResult={this.state.twentyDayMovingAvgResult}
          fiftyDayMovingAvgResult={this.state.fiftyDayMovingAvgResult}

          resultsCalculations={this.resultsCalculations}
          applePrices={this.state.applePrices}
          
          exitSelect={this.exitSelect}
          calculateTotal={this.calculateTotal}
          buyStock={this.buyStock}
          sellStock={this.sellStock}
          endDay={this.endDay}
        />
      </div>
    )
  }
}

export default App;