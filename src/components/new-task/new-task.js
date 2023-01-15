import React from 'react';

function NewTask(props) {
  const { onSubmit, label, min, sec, onLabelChange, onMinChange, onSecChange } = props;

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        name="title"
        placeholder="What needs to be done?"
        value={label}
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        value={min}
        max="59"
        type="number"
        onChange={onMinChange}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        value={sec}
        max="59"
        type="number"
        onChange={onSecChange}
      />
      <input type="submit" className="new-todo-form__submit" />
    </form>
  );
}

export default NewTask;
