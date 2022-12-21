import React, { Component } from "react";

export default class AppHeader extends Component {
  handleKeyUp = (e) => {
    if (e.key === "Enter") {
      this.props.onItemAdd(document.getElementsByClassName("new-todo")[0].value);
      document.getElementsByClassName("new-todo")[0].value = "";
    }
  };
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" onKeyUp={(e) => this.handleKeyUp(e)} autoFocus />
      </header>
    );
  }
}
