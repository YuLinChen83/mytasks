import types from "../actions/types";

const todos = (state = [], action) => {
  switch (action.type) {
    case types.DELETE_TODO:
      return state.filter(item => item.id !== action.id);
    case types.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, status: todo.status === "DOING" ? "DONE" : "DOING" }
          : todo
      );
    case types.UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, title: action.title } : todo
      );
    case types.FETCH_TODOLIST_JSON:
      return action.data;
    case "UPDATE_TASK_DATA":
      console.log(action.data);
      return action.data;
    // case
    default:
      return state;
  }
  // switch (action.type) {
  //   case type.FETCH_TODOLIST_JSON:
  //     return state;
  //     case 'FETCH_COMPLETE':
  //     return
  //     break;

  //   default:
  //     break;
  // }
};

export default todos;
