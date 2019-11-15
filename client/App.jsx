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

      // dummy stocks populated while waiting for database info
      // state.stocks will populate HoldingsBox
      stocks: [
        {name: 'AAPL', avg_value: 100, amount_owned: 25},
        {name: 'WMT', avg_value: 50, amount_owned: 50}
      ],
      
      // to be set any time the user clicks a stock name
      // it will flip GlobalBox to InnerStockBox, populating with pertinent stock information
      // dummy data below
      selectedStockName: 'XXXX',
      totalValue: 0,
      tempQuantity: 0,
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

    this.exitSelect = this.exitSelect.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.buyStock = this.buyStock.bind(this);
    this.sellStock = this.sellStock.bind(this);
  }

  // the following are optional routes for gathering data from users and the database
  getHoldings() {
    axios.get(`http://localhost:8080/get/${this.state.user_Id}`, this.state.user_Id)
    .then(res => {
      const stocks = res.data;
      this.setState({ stocks });
    })
  }



  login(info){
    firebase.auth().signInWithEmailAndPassword(info.username, info.password)
    .catch(function(error) {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({resonse: errorMessage})
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
      this.setState({resonse: errorMessage})
    });
      // .then(() => this.setState({day: 0, cash: 50000}))
    }
  }
  // ending the day, or logging out of a user session
  endDay() {
    console.log('You ended the day. Zzz')
    this.setState({ day: this.state.day + 1 })
  }


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
  calculateTotal(totalObj) {
    const { value, quantity } = totalObj;
    let totalValue = Number((value * quantity).toFixed(2))
    let tempQuantity = Number(quantity)
    this.setState( { totalValue, tempQuantity } )
  }


  endDay = () => {
    this.setState(state => {
      return {
        day: state.day + 1
      }
    })
    axios.put('/endDay', {user_id: this.state.user_Id, newDay: this.state.day})
    .catch(err=> {
      if (err) {
        console.log(err)
      }
    })
  }

  // methods for buying and selling stocks

  buyStock(purchase){
    const { name, value, quantity } = purchase;
    let boughtStock;
    // copying state
    const tempStocks = [...this.state.stocks]
    let cash = Number(this.state.cash);
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
        tempStocks.push(boughtStock);
        break;
      }
    }
    if(!tempStocks.length) {
      boughtStock = { name: name, avg_value: value, amount_owned: 0 };
      tempStocks.push(boughtStock);
    }
    // updating quantity & cash to temporary stock
    cash = (cash - this.state.totalValue).toFixed(2);
    boughtStock.amount_owned += quantity;
    // updating state
    this.setState({ stocks: tempStocks, totalValue: '', cash })

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
    // this.getHoldings()
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