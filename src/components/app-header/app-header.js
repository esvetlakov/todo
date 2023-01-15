import { Component } from 'react';

import NewTask from '../new-task/new-task';

export default class AppHeader extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onItemAdd } = this.props;
    const { label, min, sec } = this.state;
    e.preventDefault();
    onItemAdd(label, min, sec);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTask
          label={label}
          min={min}
          sec={sec}
          onLabelChange={this.onLabelChange}
          onMinChange={this.onMinChange}
          onSecChange={this.onSecChange}
          onSubmit={this.onSubmit}
        />
      </header>
    );
  }
}
