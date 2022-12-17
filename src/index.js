import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import AppHeader from "./components/app-header";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

const App = () => {
  const todoData = [
    { taskName: "Test", status: "completed", created: "1 min ago", id: 1 },
    { taskName: "Test2", status: "editing", created: "5 mins ago", id: 2 },
    { taskName: "Test3", status: "", created: "10 sec ago", id: 3 },
  ];

  return (
    <section className="todoapp">
      <AppHeader />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
