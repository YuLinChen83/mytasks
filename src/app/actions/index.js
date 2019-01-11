import types from './types';
import fetch from 'cross-fetch';

const addTodo = value => {
  return dispatch => {
    return fetch('https://moocs-todo.herokuapp.com/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: value, status: "DOING" }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log("addTodo ok!", response);
        const data = fetch('https://moocs-todo.herokuapp.com/api/tasks').then(response => response.json());
        return data;
      }
    }).then(data => {
      return dispatch(receiveTodolistJson(data));
    }).catch(error => console.error('Error:', error));
  }
}

const deleteTodo = id => {
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        console.log("deleteTodo ok!", response);
        return dispatch({
          type: types.DELETE_TODO,
          id
        });
      }
    }).catch(error => console.error('Error:', error));
  }
}

const toggleTodo = (id, status) => {
  let updatedStatus = status === "DOING" ? "DONE" : "DOING";
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: 'PUT',
      body: JSON.stringify({ status: updatedStatus }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log("toggleTodo ok!", response);
        return dispatch({
          type: types.TOGGLE_TODO,
          id
        });
      }
    }).catch(error => console.error('Error:', error));
  }
}

const updateTodo = (id, title, status) => {
  console.log("updateTodo action");
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: 'PUT',
      body: JSON.stringify({ title: title, status }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log("updateTodo ok!", response);
        return dispatch({
          type: types.UPDATE_TODO,
          id,
          title
        });
      }
    }).catch(error => console.error('Error:', error));
  }
}

const fetchTodolistJson = async () => {
  const data = await fetch('https://moocs-todo.herokuapp.com/api/tasks').then(response => response.json());
  return dispatch => {
    dispatch(receiveTodolistJson(data));
  }
}

const receiveTodolistJson = json => ({
  type: types.FETCH_TODOLIST_JSON,
  data: json
});

const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
})

export default {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  fetchTodolistJson,
  receiveTodolistJson,
  setVisibilityFilter
}