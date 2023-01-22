import PropTypes from 'prop-types';

import Timer from '../timer/timer';

function Task(props) {
  const { taskName, created, onMarkCompleted, onDelete, onEditClick, status, taskMin, taskSec } = props;
  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onMarkCompleted} defaultChecked={status} />
      <label>
        <span className="title">{taskName}</span>
        <span className="description">
          <Timer taskMin={taskMin} taskSec={taskSec} />
        </span>
        <span className="description">{created} ago</span>
      </label>
      <button type="button" aria-label="edit item" className="icon icon-edit" onClick={onEditClick} />
      <button type="button" aria-label="delete item" className="icon icon-destroy" onClick={onDelete} />
    </div>
  );
}

Task.defaultProps = {
  onMarkCompleted: () => {},
  onDelete: () => {},
  onEditClick: () => {},
};

Task.propTypes = {
  onMarkCompleted: PropTypes.func,
  onDelete: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default Task;
