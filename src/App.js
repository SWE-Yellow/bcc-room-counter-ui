import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MaterialTable from 'material-table';
import LoginForm from './components/LoginForm/LoginForm';

const initialState = {
  loggedIn: false,
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

      return (
        <div className="App">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="table">
            <MaterialTable
              title="Boston Code Camp Rooms"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data.push(newData);
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data[data.indexOf(oldData)] = newData;
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data.splice(data.indexOf(oldData), 1);
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
              }}
            />
          </div>
        </div>
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
      });

      return true;
    }
    else{
      // Login failed
      return false;
    }
  }
}