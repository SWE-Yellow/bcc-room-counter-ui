import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Speaker Name', field: 'name' },
      { title: 'Speaker Email', field: 'email' },
    ],
    data: [
      { name: 'John Cena', email: 'cena@wwe.com' },
      {
        name: 'Anakin Skywalker',
        email: 'darthvader@sith.com'
      },
    ],
  });

  return (
    <div className="Speakers">
      <div className="table">
        <MaterialTable
          title="Boston Code Camp Speakers"
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