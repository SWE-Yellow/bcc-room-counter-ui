import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';

const { Option } = Select;

const speakers = ['Anakin Skywalker', 'Tony Stark'];
const rooms = ['Dobbs 310', 'Dobbs 311'];
const times = ['10:00 - 11:00', '11:30 - 12:45'];

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
          {rooms.map(room => (<Option key={room}>{room}</Option>))}
        </Select>
      },
      {
        title: 'Speaker',
        dataIndex: 'speaker',
        render: () => 
        <Select name="Speakers" placeholder="Select Speaker" style={{ width: 200 }} >
          {speakers.map(speaker => (<Option key={speaker}>{speaker}</Option>))}
        </Select>
      },
      {
        title: 'Time Slot',
        dataIndex: 'time',
        render: () => 
        <Select name="Timeslot" placeholder="Select Time" style={{ width: 200 }} >
          {times.map(time => (<Option key={time}>{time}</Option>))}
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
      dataSource: [
        {
          key: '0',
          name: 'Presentation 0',
        },
        {
          key: '1',
          name: 'Presentation 1',
        },
      ],
      count: 2,
    };
  }


  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };


  edit(key) {
    this.setState({ editingKey: key });
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };


  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Presentation ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
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
