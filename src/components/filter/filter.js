import { useState } from 'react';
import PropTypes from 'prop-types';

function TasksFilter(props) {
  const [filter, setFilter] = useState('all');

  const onFilterClick = (type) => {
    const { taskFilter } = props;
    taskFilter(type);
    setFilter(type);
  };

  return (
    <ul className="filters">
      <form>
        <li>
          <label className={filter === 'all' ? 'selected' : ''}>
            <input
              type="radio"
              checked={filter === 'all'}
              onChange={() => {
                onFilterClick('all');
              }}
              value="all"
            />
            All
          </label>
        </li>
        <li>
          <label className={filter === 'active' ? 'selected' : ''}>
            <input
              type="radio"
              checked={filter === 'active'}
              onChange={() => {
                onFilterClick('active');
              }}
              value="active"
            />
            Active
          </label>
        </li>
        <li>
          <label className={filter === 'completed' ? 'selected' : ''}>
            <input
              type="radio"
              checked={filter === 'completed'}
              onChange={() => {
                onFilterClick('completed');
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

TasksFilter.defaultProps = {
  taskFilter: () => {},
};
TasksFilter.propTypes = {
  taskFilter: PropTypes.func,
};

export default TasksFilter;
