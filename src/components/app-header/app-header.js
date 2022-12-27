import { Component } from 'react';

import NewTask from '../new-task/new-task';

export default class AppHeader extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onItemAdd } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onItemAdd(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTask label={label} onLabelChange={this.onLabelChange} onSubmit={this.onSubmit} />
      </header>
    );
  }
}
