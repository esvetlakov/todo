import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onMarkCompleted: () => {},
    onDelete: () => {},
    onEditClick: () => {},
  };

  static propTypes = {
    onMarkCompleted: PropTypes.func,
    onDelete: PropTypes.func,
    onEditClick: PropTypes.func,
    taskName: PropTypes.string,
    created: PropTypes.string,
  };

  render() {
    const { taskName, created, onMarkCompleted, onDelete, onEditClick } = this.props;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onMarkCompleted} />
        <label>
          <span className="description">{taskName}</span>
          <span className="created">created {created} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClick} />
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    );
  }
}
