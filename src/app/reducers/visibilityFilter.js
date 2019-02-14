import types from "../actions/types";

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter;
    case "SET_OK":
      console.log("SET_OK");
      return state;
    default:
      return state;
  }
};

export default visibilityFilter;
