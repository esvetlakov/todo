import React, { Component } from 'react';
import Task from './task/task';
import PropTypes from 'prop-types';

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
    editingValue: PropTypes.object,
    todos: PropTypes.array,
    status: PropTypes.bool,
    editing: PropTypes.bool,
    hidden: PropTypes.bool,
  };

  classNameSet = (status, editing, hidden) => {
    if (hidden === true) {
      return 'hidden';
    }
    if (editing === true) {
      return 'editing';
    } else if (status === true) {
      return 'completed';
    } else if (status === false) {
      return 'uncompleted';
    }
  };

  render() {
    const { todos, onMarkCompleted, onDelete, onEditClick, onItemChange, editingValue } = this.props;

    const handleKeyUp = (e, id) => {
      if (e.key === 'Enter') {
        onItemChange(document.getElementsByClassName('edit')[0].value, id);
      }
    };

    const elements = todos.map((item) => {
      const { id, status, hidden, editing, ...itemProps } = item;

      const EditingItem = () => {
        if (editing === true) {
          return <input type="text" className="edit" defaultValue={editingValue.taskName} onKeyUp={(e) => handleKeyUp(e, editingValue.id)} autoFocus />;
        }
      };

      return (
        <li key={id} className={this.classNameSet(status, editing, hidden)}>
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
          <EditingItem />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
