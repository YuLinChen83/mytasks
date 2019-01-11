import React from 'react';

const TodoFilter = ({ setVisibilityFilter }) => (
  <div id="todo-filter">
    <button className="btn active" onClick={() => setVisibilityFilter("SHOW_ALL")}>All</button>
    <button className="btn" onClick={() => setVisibilityFilter("SHOW_ACTIVE")}>Doing</button>
    <button className="btn" onClick={() => setVisibilityFilter("SHOW_COMPLETED")}>Done</button>
  </div>
)

export default TodoFilter;