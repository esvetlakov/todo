import { Component } from 'react';
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
    const newState = { all: false, active: false, completed: false };
    newState[type] = true;
    this.setState(newState);
  };

  render() {
    const { all, active, completed } = this.state;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={all === true ? 'selected' : ''}
            onClick={() => {
              this.onFilterClick('all');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={active === true ? 'selected' : ''}
            onClick={() => {
              this.onFilterClick('active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={completed === true ? 'selected' : ''}
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
