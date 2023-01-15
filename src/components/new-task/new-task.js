import React from 'react';

function NewTask(props) {
  const { onSubmit, label, onLabelChange } = props;

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        name="title"
        placeholder="What needs to be done?"
        value={label}
        onChange={onLabelChange}
      />
      <input className="new-todo-form__timer" name="min" placeholder="Min" />
      <input className="new-todo-form__timer" name="sec" placeholder="Sec" />
    </form>
  );
}

export default NewTask;
