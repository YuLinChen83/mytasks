import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: "..."
    };
  }
  componentDidMount() {
    this.setState({
      isEditing: false,
      title: this.props.todo.title
    });
  }
  handleToggle = () => {
    if (!this.state.isEditing) this.props.onClick();
    else return;
  };
  handleFocus = () => {
    this.setState({ isEditing: true });
  };
  handleBlur = () => {
    this.setState({ isEditing: false });
  };
  handleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleKeyPress = e => {
    if (e.charCode === 13) {
      const todo = this.props.todo;
      this.props.updateTodo(todo.id, this.state.title, todo.status);
    }
  };
  render() {
    const { todo, delTodoClick } = this.props;
    return (
      <li>
        <div className="wrapper">
          <input
            id={todo.id}
            type="checkbox"
            checked={todo.status === "DONE"}
            onChange={this.handleToggle}
          />
          <label htmlFor={todo.id} />
        </div>
        <input
          value={this.state.title}
          type="text"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button className="pull-right" onClick={delTodoClick}>
          <span className="close" />
        </button>
      </li>
    );
  }
}

export default TodoItem;
