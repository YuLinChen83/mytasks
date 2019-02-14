import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

class VisibleTodoList extends Component {
  componentDidMount() {
    // const fetchData =
    console.log(
      axios
        .get("https://hidden-lowlands-59931.herokuapp.com/games")
        .then(data => {
          console.log(data.data);
          return data;
        })
    );
  }
  render() {
    const { todos, onTodoClick, deleteTodo, updateTodo } = this.props;

    return (
      <ul id="todolist">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClick={() => onTodoClick(todo.id, todo.status)}
            delTodoClick={() => deleteTodo(todo.id)}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    );
  }
}

export default VisibleTodoList;
