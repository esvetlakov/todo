import { Component } from 'react';
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
        taskName: 'Completed task',
        status: true,
        editing: false,
        hidden: false,
        timestamp: '2022-12-25T11:12:47.610Z',
        created: formatDistanceToNow(parseISO('2022-12-25T11:12:47.610Z')),
        id: 1,
      },
      {
        taskName: 'Active task',
        status: false,
        editing: false,
        hidden: false,
        timestamp: this.date,
        created: formatDistanceToNow(parseISO(this.date)),
        id: 2,
      },
      {
        taskName: 'Active task',
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

  componentDidMount() {
    this.updateCreated();
  }

  updateCreated = () => {
    setInterval(() => {
      const { todoData } = this.state;
      const newState = todoData.map((el) => {
        const elem = { ...el };
        elem.created = formatDistanceToNow(parseISO(el.timestamp));
        return elem;
      });
      this.setState({ todoData: newState });
    }, 10000);
  };

  // func to mark task as completed
  markComplete = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData];
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
  deleteTask = (id) => {
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
    console.log(value);
    if (value.split(' ').join('') !== '') {
      const date = JSON.parse(JSON.stringify(new Date()));
      this.uid += 1;
      const newItem = {
        taskName: value,
        status: false,
        editing: false,
        hidden: false,
        timestamp: date,
        created: formatDistanceToNow(parseISO(date)),
        id: this.uid,
      };
      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    } else {
      // eslint-disable-next-line
      alert('Task cannot be empty');
    }
  };

  // funcs to edit a task
  editClick = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData];
      newData[idx].editing = true;
      return {
        todoData: newData,
      };
    });
  };

  editItem = (value, id) => {
    if (value.split(' ').join('') === '') {
      // eslint-disable-next-line
      alert('Task cannot be empty');
    } else {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const newData = [...todoData];
        newData[idx].taskName = value;
        newData[idx].editing = false;
        return {
          todoData: newData,
        };
      });
    }
  };
  //

  // func to delete all completed tasks
  clearCompleted = () => {
    const { todoData } = this.state;
    todoData.forEach((el) => {
      if (el.status === true) this.deleteTask(el.id);
    });
  };

  // task filter func
  taskFilter = (type) => {
    const { todoData } = this.state;
    let newState = todoData.map((el) => {
      const elem = { ...el };
      elem.hidden = false;
      return elem;
    });
    // show all
    if (type === 'all') {
      newState = newState.map((el) => {
        const elem = { ...el };
        elem.hidden = false;
        return elem;
      });
      this.setState({ todoData: newState });
      // show not completed
    } else if (type === 'active') {
      newState = newState.map((el) => {
        const elem = { ...el };
        if (elem.status === true) elem.hidden = true;
        return elem;
      });
      this.setState({ todoData: newState });
      // show only completed
    } else if (type === 'completed') {
      newState = newState.map((el) => {
        const elem = { ...el };
        if (elem.status === false) elem.hidden = true;
        return elem;
      });
      this.setState({ todoData: newState });
    }
  };

  render() {
    const { todoData } = this.state;
    const leftCount = todoData.filter((el) => el.status === false || el.editing === true).length;
    const editingValue = todoData.find((el) => el.editing === true);

    return (
      <>
        <AppHeader onItemAdd={this.addItem} />
        <section className="main">
          <TaskList
            todos={todoData}
            onMarkCompleted={this.markComplete}
            onDelete={this.deleteTask}
            onEditClick={this.editClick}
            editingValue={editingValue}
            onItemChange={this.editItem}
          />
          <Footer itemsLeft={leftCount} onClearCompleted={this.clearCompleted} taskFilter={this.taskFilter} />
        </section>
      </>
    );
  }
}
