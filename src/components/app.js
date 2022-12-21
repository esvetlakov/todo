import React, { Component } from "react";

import AppHeader from "./app-header";
import TaskList from "./task-list";
import Footer from "./footer";

export default class App extends Component {
  uid = 100;

  date = JSON.parse(JSON.stringify(new Date()));

  state = {
    todoData: [
      { taskName: "Test", status: "uncompleted", created: this.date, id: 1 },
      { taskName: "Test2", status: "uncompleted", created: this.date, id: 2 },
      { taskName: "Test3", status: "uncompleted", created: this.date, id: 3 },
    ],
    itemsLeft: 0,
  };

  markComplete = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = JSON.parse(JSON.stringify(todoData));
      if (newData[idx].status === "uncompleted") {
        newData[idx].status = "completed";
      } else {
        newData[idx].status = "uncompleted";
      }
      return {
        todoData: newData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  addItem = (value) => {
    if (value !== "") {
      const date = JSON.parse(JSON.stringify(new Date()));
      const newItem = {
        taskName: value,
        status: "uncompleted",
        created: date,
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

  editClick = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = JSON.parse(JSON.stringify(todoData));
      newData[idx].status = "editing";
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
      newData[idx].status = "uncompleted";
      return {
        todoData: newData,
      };
    });
  };

  clearCompleted = () => {
    this.state.todoData.forEach((el) => {
      if (el.status === "completed") this.deleteItem(el.id);
    });
  };

  itemsFilter = (type) => {};

  render() {
    const leftCount = this.state.todoData.filter((el) => el.status === "uncompleted" || el.status === "editing").length;
    const editingValue = this.state.todoData.find((el) => el.status === "editing");

    return (
      <section className="todoapp">
        <AppHeader onItemAdd={this.addItem} />
        <section className="main">
          <TaskList todos={this.state.todoData} onMarkCompleted={this.markComplete} onDelete={this.deleteItem} onEditClick={this.editClick} editingValue={editingValue} onItemChange={this.editItem} />
          <Footer itemsLeft={leftCount} onClearCompleted={this.clearCompleted} onFilterClick={this.itemsFilter} />
        </section>
      </section>
    );
  }
}
