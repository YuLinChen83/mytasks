import React, { Component } from 'react';
class TodoInput extends Component {
  render() {
    const { addTodo } = this.props;
    let input;
    return (
      <div className="todo-input">
        <form className="form-inline"
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            addTodo(input.value)
            input.value = ''
          }}
        >
          <div className="row">
            <input className="form-control col-md-8"
              type="text"
              ref={node => {
                input = node
              }}
            />
            <button type="submit" className="btn">Add</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TodoInput;