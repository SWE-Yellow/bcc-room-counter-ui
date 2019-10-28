import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
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
  });

  return (
    <div className="Speakers">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="table">
        <MaterialTable
          title="Boston Code Camp Speakers"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 600);
              }),
          }}
        />
      </div>
    </div>
  );
}