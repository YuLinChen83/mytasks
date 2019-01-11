import React, { Component } from 'react';
import TodoItem from './TodoItem'

class VisibleTodoList extends Component {
  render() {
    const { todos, onTodoClick, deleteTodo, updateTodo } = this.props;

    return (
      <ul id="todolist">
        {
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onClick={() => onTodoClick(todo.id, todo.status)} delTodoClick={() => deleteTodo(todo.id)} updateTodo={updateTodo}/>
          ))
        }
      </ul>
    )
  }
}

export default VisibleTodoList;