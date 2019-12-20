import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    // this object is what we pass to state to access user information
    // I intend to refactor with hooks for simplicity's sake
    // but for now, this should work
    this.obj = {
      username: '',
      password: '',
    }
    this.update = this.update.bind(this);
    this.enterKey = this.enterKey.bind(this);
  }

  // this allows for the enter button to function, on top of button clicking
  enterKey(event){
    if(event.keyCode === 13) {
      this.props.login(this.obj)
    }
  }

  update(val, field) {
    this.obj[field] = val
  }

  componentDidMount(){
    document.addEventListener("keydown", this.enterKey, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.enterKey, false);
  }

  render() {
    return(
      <div className="mainContainer">
        <div id="loginBox">
          <input onChange={ (e) => this.update(e.target.value, e.target.name) } name="username" type="text" placeholder="Email"></input>
          <input onChange={ (e) => this.update(e.target.value, e.target.name) } name="password" id="passwordInput" type="Password" placeholder="password"></input>
          <p id="response">{this.props.response}</p>
        </div>
        <div className="loginButtons">
          <button id ="loginBtn" onClick={ () => this.props.login(this.obj)}>
            Log In
          </button>

          <button id ="signUpBtn" onClick={ () => this.props.signUp(this.obj)}>
            Sign Up
          </button>
        </div>
      </div>
    )
  }
}
export default Login;