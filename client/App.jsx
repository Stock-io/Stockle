import React, { Component } from 'react';
import axios from 'axios';

import MainContainer from './containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Banner from './components/Banner.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userId: '',
      response: '',
      holdings: [],
    }
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  // the following are optional routes for gathering data from users and the database
  getHoldings(){
    axios.get(`http://localhost:8080/get/${this.state.userId}`, this.state.userId)
    .then(res => {
      const holdings = res.data;
      this.setState({ holdings });
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
    this.setState({ user : '' , holdings : []})
  }

  componentDidMount() {
    this.getHoldings()
  }

  // if not logged in, the landing page will render a login container
  // if logged in, it will conditionally render the UI
  
  render() {
    if(!this.state.user){
      return(
        <div className="outerContainer">
          <Banner />
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
        <Banner />
        <MainContainer 
          userId={this.state.userId} 
          holdings={this.state.holdings} 
          logout={this.logout}
        />
      </div>
    )
  }
}

export default App;