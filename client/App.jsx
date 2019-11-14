import React, { Component } from 'react';
import axios from 'axios';

import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Banner from './components/Banner.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Id: '',
      response: '',
      name: 'HoldName',
      cash: 5000,
      day: 99,
      // dummy stocks populated while waiting for database info
      stocks: [{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5}],

      // results: {
      //   maxProfit: 0,
      //   minProfit: 0,
      // },
      maxProfitResult: 0,
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);

    this.maxProfit = this.maxProfit.bind(this);
  }

  // the following are optional routes for gathering data from users and the database
  getHoldings(){
    axios.get(`http://localhost:8080/get/${this.state.user_Id}`, this.state.user_Id)
    .then(res => {
      const stocks = res.data;
      this.setState({ stocks });
    })
  }

  login(info){
    axios.post(`http://localhost:8080/login`, info)
    .then(res => {
      if(!res.data){ this.setState({ response : 'Invalid user' }) }
      else if(res.data.username){
        if(res.data.password !== info.password){
          this.setState({ response : 'Incorrect password.' })
          return;
        }
        this.setState({ user : res.data.username, userId : res.data._id, response : '' }, () => {
          this.getThoughts();
        })
      }
    })
  }

  signUp(info){
    if(!info.username || !info.password){
      this.setState({ response : 'Missing field' })
      return;
    }
    else { this.setState({ response : '' }) }
  }

  logout(){
    this.setState({ name: '' , cash: 0, day: 0, stocks: []})
  }

 
  maxProfit(arr) {    
    if (!Array.isArray(arr) || arr.length < 1) {
      return;
    }
  
    let minPrice = arr[0];
    let maxProfit = arr[1] - arr[0];

    // when iterating over an array, use forEach() (otherwise you look like a junior dev)
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
        maxProfitResult: maxProfit,
    });
  }

  componentDidMount() {
    this.getHoldings()
  }


  // if not logged in, the landing page will render a login container
  // if logged in, it will conditionally render the UI

  render() {
    if(!this.state.name){
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
          user_Id={this.state.user_Id} 
          state={this.state}

          day={this.state.day}
          maxProfit={this.maxProfit}
          maxProfitResult={this.state.maxProfitResult}
        />
      </div>
    )
  }
}

export default App;