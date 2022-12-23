import React, { Component } from "react";

import TasksFilter from "./filter";

export default class Footer extends Component {
  render() {
    const { onClearCompleted, taskFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.itemsLeft} items left</span>
        <TasksFilter taskFilter={taskFilter}/>
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
