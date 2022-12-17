import React from "react";
import ListItem from "./task";

const TodoList = ({ todos }) => {
  const elements = todos.map((item) => {
    const { id, status = "", ...itemProps } = item;

    const Editing = () => {
      if (status === "editing") {
        return <input type="text" className="edit" value='Editing task'/>;
      }
    };

    return (
      <li key={id} className={status}>
        <ListItem {...itemProps} />
        <Editing />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TodoList;
