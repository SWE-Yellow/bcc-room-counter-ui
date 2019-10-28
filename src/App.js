import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './components/LoginForm/LoginForm';
import Rooms from './components/Rooms';
import Speakers from './components/Speakers';
import Times from './components/Times';
import Presentations from './components/Presentations';

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

  render () {

    if(this.state['loggedIn'] === false) {

      return (
        <LoginForm onSubmit={ this.login } />
      );
    }
    else {

      return (
        <Router>
          <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <div className="navbar">
              <Navbar />
            </div>
            <Route path='/' exact strict component={LoginForm}></Route>
            <Route path='/Rooms' component={Rooms}></Route>
            <Route path='/Speakers' component={Speakers}></Route>
            <Route path='/Times' component={Times}></Route>
            <Route path='/Presentations' component={Presentations}></Route>
          </div>
        </Router>
      );
    }
  }

  /**
   * Passed into LoginForm. Use this to instantiate the UIInterface class.
   * 
   * @param string username 
   * @param string password 
   */
  login(username, password){
    console.log(username, " ", password);   /******          Remove this before moving on           ******/

    if( username === "admin" & password === "admin") {

      // Update the state so loggedIn is now true; indicates login successful
      this.setState({
        loggedIn: true,
        columns: this.state.columns,
        data: this.state.data,
      }, () => {
        localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn)) // Use cookies to store the "loggedIn" state
      });

      return true;
    }
    else{
      // Login failed
      return false;
    }
  }
}
