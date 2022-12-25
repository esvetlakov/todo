import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './filter/filter';

export default class Footer extends Component {
  static defaultProps = {
    taskFilter: () => {},
    onClearCompleted: () => {},
  };

  static propTypes = {
    taskFilter: PropTypes.func,
    onClearCompleted: PropTypes.func,
  };

  render() {
    const { onClearCompleted, taskFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.itemsLeft} items left</span>
        <TasksFilter taskFilter={taskFilter} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
