import React, { Component } from 'react'

class TodoFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "SHOW_ALL"
    };
  }
  handleClick = (filter) => {
    this.props.setVisibilityFilter(filter);
    this.setState({filter});
  }
  render() {
    const { filter } = this.state;
    return (
      <div id="todo-filter">
        <button className={`btn ${filter === "SHOW_ALL" ? "active" : ""}`} onClick={() => this.handleClick("SHOW_ALL")}>All</button>
        <button className={`btn ${filter === "SHOW_ACTIVE" ? "active" : ""}`} onClick={() => this.handleClick("SHOW_ACTIVE")}>Doing</button>
        <button className={`btn ${filter === "SHOW_COMPLETED" ? "active" : ""}`} onClick={() => this.handleClick("SHOW_COMPLETED")}>Done</button>
      </div>
    )
  }
}

export default TodoFilter;