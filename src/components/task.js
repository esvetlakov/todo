import React, { Component } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { parseISO } from "date-fns";

export default class Task extends Component {
  render() {
    const { taskName, created, onMarkCompleted, onDelete, onEditClick } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onMarkCompleted} />
        <label>
          <span className="description">{taskName}</span>
          <span className="created">{formatDistanceToNow(parseISO(created))} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClick} />
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    );
  }
}
