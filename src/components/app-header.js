import React, { Component } from "react";

export default class AppHeader extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.key === "Enter") {
      this.props.onItemAdd(this.state.label);
      this.setState({
        label: "",
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" value={this.state.label} onChange={this.onLabelChange} onKeyUp={this.onSubmit} autoFocus />
      </header>
    );
  }
}
