import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    taskFilter: () => {},
  };

  static propTypes = {
    taskFilter: PropTypes.func,
  };

  state = {
    all: true,
    active: false,
    completed: false,
  };

  onFilterClick = (type) => {
    const { taskFilter } = this.props;
    taskFilter(type);
    const newState = {
      all: false,
      active: false,
      completed: false,
    };
    newState[type] = true;
    this.setState((state) => {
      return (state = newState);
    });
  };

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            className={this.state.all === true ? 'selected' : ''}
            onClick={() => {
              this.onFilterClick('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.state.active === true ? 'selected' : ''}
            onClick={() => {
              this.onFilterClick('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.state.completed === true ? 'selected' : ''}
            onClick={() => {
              this.onFilterClick('completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
