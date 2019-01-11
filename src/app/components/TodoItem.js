import React from 'react'

const TodoItem = ({ todo, onClick, delTodoClick }) => (
  <li>
    <div className="checkbox">
      <label>
        <input type="checkbox" checked={todo.status == "DONE"} onChange={onClick} /> {todo.title}
      </label>
      <button className="pull-right" onClick={delTodoClick}><span className="glyphicon glyphicon-remove">x</span></button>
    </div>
  </li>
)

export default TodoItem;