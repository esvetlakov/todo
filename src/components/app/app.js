import React, { Component } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import AppHeader from '../app-header/app-header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  uid = 100;

  date = JSON.parse(JSON.stringify(new Date()));

  state = {
    todoData: [
      {
        taskName: 'Test',
        status: false,
        editing: false,
        hidden: false,
        timestamp: '2022-12-25T11:12:47.610Z',
        created: formatDistanceToNow(parseISO('2022-12-25T11:12:47.610Z')),
        id: 1,
      },
      {
        taskName: 'Test2',
        status: false,
        editing: false,
        hidden: false,
        timestamp: this.date,
        created: formatDistanceToNow(parseISO(this.date)),
        id: 2,
      },
      {
        taskName: 'Test3',
        status: false,
        editing: false,
        hidden: false,
        timestamp: '2022-11-25T13:12:47.610Z',
        created: formatDistanceToNow(parseISO('2022-11-25T13:12:47.610Z')),
        id: 3,
      },
    ],
  };

  // func to update created state

  updateCreated = () => {
    setInterval(() => {
      const newState = [...this.state.todoData];
      newState.forEach((el) => {
        el.created = formatDistanceToNow(parseISO(el.timestamp));
      });
      this.setState({ todoData: newState });
    }, 10000);
  };

  componentDidMount() {
    this.updateCreated();
  }

  // func to mark task as completed
  markComplete = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = JSON.parse(JSON.stringify(todoData));
      if (newData[idx].status === false) {
        newData[idx].status = true;
      } else {
        newData[idx].status = false;
      }
      return {
        todoData: newData,
      };
    });
  };

  // func to delete task
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  // func to create a new task
  addItem = (value) => {
    if (value !== '') {
      const date = JSON.parse(JSON.stringify(new Date()));
      const newItem = {
        taskName: value,
        status: false,
        editing: false,
        hidden: false,
        timestamp: date,
        created: formatDistanceToNow(parseISO(date)),
        id: this.uid++,
      };
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    }
  };

  // funcs to edit a task
  editClick = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = JSON.parse(JSON.stringify(todoData));
      newData[idx].editing = true;
      return {
        todoData: newData,
      };
    });
  };

  editItem = (value, id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = JSON.parse(JSON.stringify(todoData));
      newData[idx].taskName = value;
      newData[idx].editing = false;
      return {
        todoData: newData,
      };
    });
  };
  //

  // func to delete all completed tasks
  clearCompleted = () => {
    this.state.todoData.forEach((el) => {
      if (el.status === true) this.deleteItem(el.id);
    });
  };

  // task filter func
  taskFilter = (type) => {
    const newState = [...this.state.todoData];
    newState.forEach((el) => {
      el.hidden = false;
    });
    //show all
    if (type === 'all') {
      newState.forEach((el) => {
        el.hidden = false;
      });
      this.setState({ todoData: newState });
      //show not completed
    } else if (type === 'active') {
      newState.forEach((el) => {
        if (el.status === true) el.hidden = true;
      });
      this.setState({ todoData: newState });
      //show only completed
    } else if (type === 'completed') {
      newState.forEach((el) => {
        if (el.status === false) el.hidden = true;
      });
      this.setState({ todoData: newState });
    }
  };

  render() {
    const leftCount = this.state.todoData.filter((el) => el.status === false || el.editing === true).length;
    const editingValue = this.state.todoData.find((el) => el.editing === true);

    return (
      <section className="todoapp">
        <AppHeader onItemAdd={this.addItem} />
        <section className="main">
          <TaskList todos={this.state.todoData} onMarkCompleted={this.markComplete} onDelete={this.deleteItem} onEditClick={this.editClick} editingValue={editingValue} onItemChange={this.editItem} />
          <Footer itemsLeft={leftCount} onClearCompleted={this.clearCompleted} taskFilter={this.taskFilter} />
        </section>
      </section>
    );
  }
}
