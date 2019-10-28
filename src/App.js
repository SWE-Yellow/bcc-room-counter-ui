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

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Router>
          < Navbar />
          <switch>
              <Route path='/' exact strict component={LoginForm}></Route>
              <Route path='/Rooms' component={Rooms}></Route>
              <Route path='/Speakers' component={Speakers}></Route>
              <Route path='/Times' component={Times}></Route>
              <Route path='/Presentations' component={Presentations}></Route>
          </switch>
        </Router>
      </div>
    );
  }
}
