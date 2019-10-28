import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Rooms from './components/Rooms';
// import Times from './components/Times';
// import Speakers from './components/Speakers';
// import Presentations from './components/Presentations';

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

  render() {
    return (
      <div className="App">
        < Rooms />
      </div>
    );
  }
}
