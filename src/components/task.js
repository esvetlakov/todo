import React, { Component } from "react";

export default class Task extends Component {

  state = {
    status: 'uncompleted'
  }

  onToggleClick = () => {
    console.log(`Done ${this.props.taskName}`);
  };

  render() {
    const { taskName, created } = this.props;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={this.onToggleClick} />
        <label>
          <span className="description">{taskName}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
}
