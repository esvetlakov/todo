import { Component } from 'react';

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
    if (e.key === 'Enter') {
      onItemAdd(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          onChange={this.onLabelChange}
          onKeyUp={this.onSubmit}
        />
      </header>
    );
  }
}
