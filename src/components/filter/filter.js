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
    selected: 'all',
  };

  onFilterClick = (type) => {
    const { taskFilter } = this.props;
    taskFilter(type);
    this.setState({ selected: type });
  };

  render() {
    const { selected } = this.state;
    return (
      <ul className="filters">
        <form>
          <li>
            <label className={selected === 'all' ? 'selected' : ''}>
              <input
                type="radio"
                checked={selected === 'all'}
                onChange={() => {
                  this.onFilterClick('all');
                }}
                value="all"
              />
              All
            </label>
          </li>
          <li>
            <label className={selected === 'active' ? 'selected' : ''}>
              <input
                type="radio"
                checked={selected === 'active'}
                onChange={() => {
                  this.onFilterClick('active');
                }}
                value="active"
              />
              Active
            </label>
          </li>
          <li>
            <label className={selected === 'completed' ? 'selected' : ''}>
              <input
                type="radio"
                checked={selected === 'completed'}
                onChange={() => {
                  this.onFilterClick('completed');
                }}
                value="completed"
              />
              Completed
            </label>
          </li>
        </form>
      </ul>
    );
  }
}
