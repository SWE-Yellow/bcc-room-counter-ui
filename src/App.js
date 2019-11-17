import React from 'react';
import Navbar from './components/Navbar/Navbar';
import fire from './components/fire';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm/LoginForm';
import Rooms from './components/Rooms';
import Speakers from './components/Speakers';
import Times from './components/Times';
import Presentations from './components/Presentations';
import UIInterface from './components/bcc-room-counter/UIInterface.js'


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

let UII = new UIInterface()
/*
* Firebase account and default login:
* Email: bcc_counter@gmail.com
*  Pass: team_yellow123
*/
export default class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = initialState;
    this.UII = UII;

    this.login = this.login.bind(this);
  }

  render () {

    var times = UII.fetchTimes();
    var i;
    // console.log(times)
    for(i = 0; i < times.length; i++){
      console.log(times.get("firstName"))
    }
    // console.log(times)

    // console.log(JSON.parse(this.UII.fetchRooms()))
    // {
    //   [UII.fetch()].map(room => (console.log(room)))
    // }
    return(
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <LoginForm onSubmit={this.login}/>
          </Route>
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
          <PrivateRoute path='/Login'>
            <LoginForm />
          </PrivateRoute>
        </Switch>
      </Router>
    )
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

    let user = checkAuthStatus();

    if (user) {
      this.setState({
        loggedIn: true,
      }, () => {
        localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn)) // Use cookies to store the "loggedIn" state
      });
    }

    return this.state.loggedIn;
  }
}

function checkAuthStatus() {
   return new Promise((resolve, reject) => {
    try {
      fire.auth()
       .onAuthStateChanged(user => {
           console.log('userChecked:', user)
           resolve(user);
       });
    } catch {
      reject('api failed')
    }
  });
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
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}