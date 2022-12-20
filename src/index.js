import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { createRoot } from "react-dom/client";

import "./index.css";

import AppHeader from "./components/app-header";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

//const container = document.getElementById("root");
//const root = createRoot(container);

export default class App extends Component {
  uid = 100;

  date = new Date();

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
      if (todoData[idx].status === "uncompleted") {
        todoData[idx].status = "completed";
      } else {
        todoData[idx].status = "uncompleted";
      }
      return {
        todoData: todoData,
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
      const date = new Date();
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

  editItem = (id) => {
    console.log(id);
  };

  clearCompleted = () => {
    this.state.todoData.forEach((el) => {
      if (el.status === "completed") this.deleteItem(el.id);
    });
  };

  render() {
    const leftCount = this.state.todoData.filter((el) => el.status === "uncompleted").length;

    return (
      <section className="todoapp">
        <AppHeader onItemAdd={this.addItem} />
        <section className="main">
          <TaskList todos={this.state.todoData} onMarkCompleted={this.markComplete} onDelete={this.deleteItem} onEditClick={this.editItem} />
          <Footer itemsLeft={leftCount} onClearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
//root.render(<App />);
