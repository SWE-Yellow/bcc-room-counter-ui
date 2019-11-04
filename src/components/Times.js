import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Start Time', field: 'start' },
      { title: 'End Time', field: 'end' },
    ],
    data: [
      { start: '8 AM', end: '5 PM' },
      {
        start: '3 PM',
        end: '3:30 PM'
      },
    ],
  });

  return (
    <div className="Times">
      <div className="table">
        <MaterialTable
          title="Boston Code Camp Times"
          columns={state.columns}
          data={state.data}
          style={{marginLeft: '4%', marginRight: '4%'}}
          localization={{
            header: {
                actions: 'Edit/Delete'
            },
        }}
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