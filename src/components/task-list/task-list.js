import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './task/task';
import EditingItem from './editing-item/editing-item';

export default class TaskList extends Component {
  static defaultProps = {
    onMarkCompleted: () => {},
    onDelete: () => {},
    onEditClick: () => {},
    onItemChange: () => {},
  };

  static propTypes = {
    onMarkCompleted: PropTypes.func,
    onDelete: PropTypes.func,
    onEditClick: PropTypes.func,
    onItemChange: PropTypes.func,
  };

  static classNameSet(status, editing, hidden) {
    if (hidden === true) {
      return 'hidden';
    }
    if (editing === true) {
      return 'editing';
    }
    if (status === true) {
      return 'completed';
    }
    return 'uncompleted';
  }

  render() {
    const { todos, onMarkCompleted, onDelete, onEditClick, onItemChange, editingValue } = this.props;
    const elements = todos.map((item) => {
      const { id, status, hidden, editing, ...itemProps } = item;
      const classValue = TaskList.classNameSet(status, editing, hidden);

      return (
        <li key={id} className={classValue}>
          <Task
            onMarkCompleted={() => {
              onMarkCompleted(id);
            }}
            onDelete={() => {
              onDelete(id);
            }}
            onEditClick={() => {
              onEditClick(id);
            }}
            status={status}
            {...itemProps}
          />
          <EditingItem onItemChange={onItemChange} editingValue={editingValue} editing={editing} />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
