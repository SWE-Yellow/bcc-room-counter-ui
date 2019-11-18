import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Button, Popconfirm, Form } from 'antd';
import UIInterface from './bcc-room-counter/UIInterface.js';

const UII = new UIInterface()
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              messemail: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Speaker Name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'Speaker Email',
        width: '30%',
        dataIndex: 'email',
        editable: true
      },
      {
        title: 'Delete',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
      {
        title: 'Edit',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a enabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];

    this.state = {
      dataSource: this.getSpeakers()
    };
  }

  getSpeakers() {
    let speakerData = []
    UII.fetchSpeakers().then(result => {
      for (let i = 0; i < result.get("name").length; i++) {
        speakerData.push(
          {
            key: i,
            name: result.get("name")[i], 
            email: result.get("email")[i],
          })
      }
    })
    return speakerData
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }


  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    UII.deleteSpeaker(key)
    this.setState({ dataSource: this.getSpeakers() });
  };
 

  handleAdd = () => {
    const { dataSource } = this.state;
    const newSpeaker = {
      key: dataSource.length,
      name: `Speaker ${dataSource.length + 1}`,
      email: "speaker@speak.com",
    };

    this.setState({
      dataSource: [...dataSource, newSpeaker]
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData, editingKey: '' });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, fontSize: 20, marginRight: "600px", marginLeft: "620px", marginTop: 16 }}>
          Add New Speaker
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{
            onChange: this.cancel,
          }}
          style={{ marginRight: "250px", marginLeft: "250px" }}
        />
      </div>
    );
  }
}
