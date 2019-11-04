import React from 'react';
import Navbar from './components/Navbar/Navbar';
import fire from './components/fire';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm/LoginForm';
import Rooms from './components/Rooms';
import Speakers from './components/Speakers';
import Times from './components/Times';
import Presentations from './components/Presentations';


const initialState = {
  loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || false,  // Use cookies to store the "loggedIn" state; https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
  columns: [
    { title: 'Room', field: 'room' },
    { title: 'Room count', field: 'count' },
  ],
  data: [
    { room: 'Accelerate', count: 100 },
    {
      room: 'Dobbs 310',
      count: 30
    },
  ],
}

/*
 * Firebase account and default login:
 * Email: bcc_counter@gmail.com
 *  Pass: team_yellow123
 */
export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = initialState;

    this.login = this.login.bind(this);
  }

  render () {
  

    if(this.state['loggedIn'] === false) {

      return (
        <LoginForm onSubmit={ this.login } />
      );
    }
    else {
      return(
        <Router>
          <Navbar />
          <Switch>
            <Route path='/login'>
              <LoginForm onSubmit={this.login}/>
            </Route>
            <PrivateRoute path='/' isLoggedIn={this.state.loggedIn}>
              <Rooms />
            </PrivateRoute>
            <PrivateRoute path='/Rooms' isLoggedIn={this.state.loggedIn}>
              <Rooms />
            </PrivateRoute>
            <PrivateRoute path='/Speakers' isLoggedIn={this.state.loggedIn}>
              <Speakers />
            </PrivateRoute>
            <PrivateRoute path='/Times' isLoggedIn={this.state.loggedIn}>
              <Times />
            </PrivateRoute>
            <PrivateRoute path='/Presentations' isLoggedIn={this.state.loggedIn}>
              <Presentations />
            </PrivateRoute>
          </Switch>
        </Router>
      )
    }
  }

  

  /**
   * Passed into LoginForm. Use this to instantiate the UIInterface class.
   * 
   * @param string username 
   * @param string password 
   */
  login(username, password){

    fire.auth().signInWithEmailAndPassword(username, password).then((u)=>{
    }).catch((error) => {
        console.log(error);
    });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        }, () => {
          localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn)) // Use cookies to store the "loggedIn" state
        }).bind(this);
      }
    });

    return this.state.loggedIn;
  }
}

function PrivateRoute({ children, isLoggedIn,...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}