import PropTypes from 'prop-types';

import TasksFilter from '../filter/filter';

function Footer(props) {
  const { onClearCompleted, taskFilter, itemsLeft } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter taskFilter={taskFilter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  taskFilter: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  taskFilter: PropTypes.func,
  onClearCompleted: PropTypes.func,
};
export default Footer;
