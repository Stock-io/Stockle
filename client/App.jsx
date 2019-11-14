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
      // dummy stocks populated while waiting for database info
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
    firebase.auth().signInWithEmailAndPassword(info.username, info.password)
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errors', errorCode, errorMessage)
    });
  }

  signUp(info){
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
      console.log('errors', errorCode, errorMessage)
    });
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
    this.setState({ name: '' , cash: 0, day: '', stocks: []})
  }


  update = (user) => {
    if (user) {
      this.setState({user_id: user.uid, name: 'I guess'})
    }
  }
  componentDidMount() {
    this.getHoldings()
    firebase.auth().onAuthStateChanged(this.update);
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