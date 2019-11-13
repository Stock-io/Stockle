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
      day: '1',
      stocks: [{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5},{name: 'Apple', avg_value: 100, amount_owned: 5}],
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
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
    this.setState({ name: '' , cash: 0, day: '', stocks: []})
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
        />
      </div>
    )
  }
}

export default App;