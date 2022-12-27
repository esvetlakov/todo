import React from 'react';

function NewTask(props) {
  const { onSubmit, label, onLabelChange } = props;

  return (
    <form onSubmit={onSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" value={label} onChange={onLabelChange} />
    </form>
  );
}

export default NewTask;
