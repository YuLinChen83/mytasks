import React, { Component } from 'react';
import TodoFilter from './TodoFilter'
import VisibleTodoList from './VisibleTodoList'
import TodoInput from './TodoInput'

class MyTasks extends Component {
  componentDidMount = async () => {
    const data = await fetch('https://moocs-todo.herokuapp.com/api/tasks').then(response => response.json());
    console.log(data);
    this.props.receiveTodolistJson(data);
  }
  render() {
    const { todos, setVisibilityFilter, onTodoClick, deleteTodo, addTodo, updateTodo } = this.props;

    return (
      <div className="todo-container">
        <div>
          <div className="todo-header">My Tasks</div>
          <TodoFilter setVisibilityFilter={setVisibilityFilter} />
          <VisibleTodoList todos={todos} onTodoClick={onTodoClick} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          <TodoInput addTodo={addTodo} />
        </div>
      </div>
    )
  }
}

export default MyTasks;