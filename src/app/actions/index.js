import types from './types';

// const addTodo = value => (dispatch, getState) => {
//   // const post = await fetch('https://moocs-todo.herokuapp.com/api/tasks').then(response => response.json());

//   const post = await fetch('https://moocs-todo.herokuapp.com/api/tasks', {
//     method: 'POST',
//     body: JSON.stringify({ title: "Meeting", status: "DOING" }),
//     headers: {
//       'content-type': 'application/json'
//     }
//   })
//     .then(res => res.json())
//     .then(result => {
//       res.send(result);
//     })
//     .catch(error => console.error('Error:', error));
//   dispatch(fetchTodolistJson(post));
// }

const addTodo = value => ({
  type: types.ADD_TODO,
  value: value
});

const deleteTodo = id => ({
  type: types.DELETE_TODO,
  id
});

const toggleTodo = id => ({
  type: types.TOGGLE_TODO,
  id
});

const fetchTodolistJson = json => ({
  type: types.FETCH_TODOLIST_JSON,
  data: json
});

const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
})


export default {
  addTodo,
  deleteTodo,
  toggleTodo,
  fetchTodolistJson,
  setVisibilityFilter
}