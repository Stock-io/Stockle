import React, { Component } from 'react';
import axios from 'axios';

import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Banner from './components/Banner.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Id: 'id',
      response: '',
      cash: 50000,
      day: 99,

      // dummy stocks populated while waiting for database info
      // state.stocks will populate HoldingsBox
      stocks: [{name: 'AAPL', avg_value: 100, amount_owned: 25},{name: 'WMT', avg_value: 50, amount_owned: 50}],
      
      // to be set any time the user clicks a stock name
      // it will flip GlobalBox to InnerStockBox, populating with pertinent stock information
      // dummy data below
      stockName: 'XXXX',
      selectedStock: {
        date: 'XX-XX-2019',
        price: '0000',
      },

      // result values for results card
      singleTradeMaxProfitResult: 0,
      singleTradeMinProfitResult: 0,
      multiTradeMaxProfitResult: 0,
      multiTradeMinProfitResult: 0,
      sevenDayMovingAvgResult: 0,
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);

    this.selectStock = this.selectStock.bind(this);

    this.singleTradeMaxProfit = this.singleTradeMaxProfit.bind(this);
    this.singleTradeMinProfit = this.singleTradeMinProfit.bind(this);
    this.multiTradeMaxProfit = this.multiTradeMaxProfit.bind(this);
    this.multiTradeMinProfit = this.multiTradeMinProfit.bind(this);
    this.sevenDayMovingAvg = this.sevenDayMovingAvg.bind(this);

    this.exitSelect = this.exitSelect.bind(this);
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
      const errorCode = error.code;
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
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log('errors', errorCode, errorMessage)
      this.setState({resonse: errorMessage})
    });
      // .then(() => this.setState({day: 0, cash: 50000}))
    }
  }


  logout(){
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });    
    this.setState({ user_Id: '' , cash: 50000, day: 0, stocks: []})
  }

  //PLEASE NOTE: SELECTSTOCK METHOD IS NOT FINISHED
  selectStock(name) {
    axios.get(`http://localhost:8080/db/stock/${name}`)
    .then(res => {
      const selectedStock = res.data.date_price[this.state.day];
      this.setState({ selectedStock, stockName: name });
    })
  }

  singleTradeMaxProfit(arr) {    
    if (!Array.isArray(arr) || arr.length < 1) {
      return;
    }
  
    let minPrice = arr[0];
    let maxProfit = arr[1] - arr[0];

    // when iterating over an array, use forEach() (otherwise you look like a junior dev). If there's a shorter syntax out there and you're not using it, it makes you look junior
    // arr.forEach();
  
    for (let i = 0; i < arr.length; i += 1) {
      let currentPrice = arr[i];
      let potentialProfit = currentPrice - minPrice;
      maxProfit = Math.max(maxProfit, potentialProfit)
      minPrice = Math.min(minPrice, currentPrice)
    }
    if (maxProfit < 0) {
      return;
    }
    
    this.setState({
      singleTradeMaxProfitResult: maxProfit,
    });
  }

  singleTradeMinProfit(arr) {
    const newArr = [];

    for (let i = 0; i < arr.length; i += 1) {
      let buyHi = arr[i];
      let sellLo = Infinity;
  
      for (let j = i + 1; j < arr.length; j += 1) {
        if (buyHi > arr[j] && sellLo > arr[j]) {
          sellLo = arr[j];
        }
      }
      
      if (buyHi > sellLo) {
        newArr.push(sellLo - buyHi)
      }
    }
  
    this.setState({
      singleTradeMinProfitResult: Math.min(...newArr),
    });
  }

  multiTradeMaxProfit(arr) {
    let result = 0;

    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i + 1] > arr[i]) {
        result += arr[i + 1] - arr[i]
      }
    }  
    this.setState({
      multiTradeMaxProfitResult: result,
    });
  }

  multiTradeMinProfit(arr) {
    let result = 0;

    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i + 1] < arr[i]) {
        result += arr[i + 1] - arr[i]
      }
    }  
    this.setState({
      multiTradeMinProfitResult: result,
    });
  }

  sevenDayMovingAvg(arr) {
    console.log('calc');
  }

  exitSelect(){
    this.setState({ stockName: 'XXXX' })
  }


  update = (user) => {
    if (user) {
      this.setState({user_Id: user.uid})
      axios.get(`/db/user/${user.uid}`)
      .then(resp => {
        if (resp.data){
          this.setState({cash: resp.data.score, day: resp.data.day, stocks: resp.data.stocks})
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
        <MainContainer selectStock={this.selectStock}
          user_Id={this.state.user_Id} 
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
          sevenDayMovingAvg={this.sevenDayMovingAvg}
          sevenDayMovingAvgResult={this.state.sevenDayMovingAvgResult}
          
          exitSelect={this.exitSelect}
        />
      </div>
    )
  }
}

export default App;