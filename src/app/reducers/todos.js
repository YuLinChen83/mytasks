import types from '../actions/types';

const todos = (state = [], action) => {
  switch (action.type) {
    case types.DELETE_TODO:
      return state.filter(item => item.id !== action.id)
    case types.TOGGLE_TODO:
      return state.map(todo => todo.id === action.id ? { ...todo, status: todo.status === "DOING" ? "DONE" : "DOING"} : todo)
    case types.UPDATE_TODO:
      return state.map(todo => todo.id === action.id ? { ...todo, title: action.title} : todo)
    case types.FETCH_TODOLIST_JSON:
      return action.data;
    default:
      return state;
  }
};

export default todos;