import React, { Component } from "react";
import Task from "./task";

export default class TaskList extends Component {
  render() {
    const { todos, onMarkCompleted, onDelete, onEditClick, onItemChange, editingValue } = this.props;

    const handleKeyUp = (e, id) => {
      if (e.key === "Enter") {
        onItemChange(document.getElementsByClassName("edit")[0].value, id);
      }
    };

    const elements = todos.map((item) => {
      const { id, status = "", ...itemProps } = item;

      const Editing = () => {
        if (status === "editing") {
          return <input type="text" className="edit" defaultValue={editingValue.taskName} onKeyUp={(e) => handleKeyUp(e, editingValue.id)} autoFocus />;
        }
      };

      return (
        <li key={id} className={status}>
          <Task
            {...itemProps}
            onMarkCompleted={() => {
              onMarkCompleted(id);
            }}
            onDelete={() => {
              onDelete(id);
            }}
            onEditClick={() => {
              onEditClick(id);
            }}
          />
          <Editing />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
