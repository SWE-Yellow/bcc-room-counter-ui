import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import UIInterface from './bcc-room-counter/UIInterface.js';

const UII = new UIInterface()
const { Option } = Select;

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
              message: `${title} is required.`,
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

export default class Presentations extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Presentation Name',
        dataIndex: 'name',
        width: '20%',
        editable: true,
      },
      {
        title: 'Room',
        dataIndex: 'room',
        render: () => 
        <Select name="room" placeholder="Select Room" style={{ width: 200 }} >
          {this.getRooms().map(room => (<Option key={room}>{room}</Option>))}
        </Select>
      },
      {
        title: 'Speaker',
        dataIndex: 'speaker',
        render: () => 
        <Select name="Speakers" placeholder="Select Speaker" style={{ width: 200 }} >
          {this.getSpeakers().map(name => (<Option key={name}>{name}</Option>))}
        </Select>
      },
      {
        title: 'Time Slot',
        dataIndex: 'time',
        render: () => 
        <Select name="Timeslot" placeholder="Select Time" style={{ width: 200 }} >
          {this.getTimes().map(time => (<Option key={time}>{time}</Option>))}
        </Select>
      },
      {
        title: 'Delete',
        dataIndex: 'Delete',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
      {
        title: 'Edit',
        dataIndex: 'operation',
        width: '10%',
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
      dataSource: this.getPresentations()
    };
  }

  getPresentations() {

    let presentationData = []
    UII.fetchPresentations().then(result => {
      for (let i = 0; i < result.get("topic").length; i++) {
        presentationData.push(
          {
            key: i,
            room: result.get("roomId")[i],
            speaker: result.get("speakersId")[i],
            time: result.get("timeId")[i]
          })
      }
    })
    return presentationData
  }

  getRooms() {
    let roomData = []
    UII.fetchRooms().then(result => { roomData = result.get("roomName") })
    return roomData
  }

  getSpeakers() {
    let speakerData = []
    UII.fetchSpeakers().then(result => { speakerData = result.get("name") })
    return speakerData
  }

  getTimes() {
    let timeData = []
    UII.fetchTimes().then(result => { timeData = result.get("combined") })
    return timeData
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
    UII.deletePresentation(key)
    this.setState({ dataSource: this.getPresentations() });
  };
 

  handleAdd = () => {
    const { dataSource } = this.state;
    const newPresentation = {
      key: dataSource.length,
      name: `Presentation ${dataSource.length + 1}`,
      room: 'roomId',
      speaker: 'SpeakerId',
      time: 'timeId'
    };
    this.setState({dataSource: [...dataSource, newPresentation]});
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
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, fontSize: 20, marginRight: "600px", marginLeft: "620px", marginTop: 16 }}>
          Add New Presentation
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          style={{ marginRight: "75px", marginLeft: "75px" }}
        />
      </div>
    );
  }
}
