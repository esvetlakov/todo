import React from "react";
import Task from "./task";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, status = "", ...itemProps } = item;

    const Editing = () => {
      if (status === "editing") {
        return <input type="text" className="edit" value="Editing task" />;
      }
    };

    return (
      <li key={id} className={status}>
        <Task {...itemProps} />
        <Editing />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
