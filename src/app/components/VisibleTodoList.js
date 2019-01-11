import React, { Component } from 'react';
import TodoItem from './TodoItem'

class VisibleTodoList extends Component {
  render() {
    const { todos, onTodoClick, deleteTodo } = this.props;

    return (
      <ul id="todolist">
        {
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onClick={() => onTodoClick(todo.id)} delTodoClick={() => deleteTodo(todo.id)} />
          ))
        }
      </ul>
    )
  }
}

export default VisibleTodoList;