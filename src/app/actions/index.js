import types from "./types";
import fetch from "cross-fetch";
import axios from "axios";
import "rxjs/Rx";
// , concat, merge
import { from, of, merge, timer, zip } from "rxjs";
import { ofType } from "redux-observable";
// import Raven from "raven-js";
import {
  mergeMap,
  // concatMap,
  map,
  catchError,
  // take,
  // retryWhen,
  // delay,
  tap
  // finalize
} from "rxjs/operators";
// import { ajax } from 'rxj'

import httpAdapter from "axios/lib/adapters/http";

// API: request, success, failed , (loading)

axios.defaults.adapter = httpAdapter;

const fetchDataEpic = action$ =>
  action$.pipe(
    ofType("SET_VISIBILITY_FILTER"),
    mergeMap(action =>
      from(axios.get("https://hidden-lowlands-59931.herokuapp.com/")).pipe(
        map(result => {
          // console.log(result);
          // TODO: update reducer
          return { type: "SET_OK", payload: result };
        })
      )
    )
  );

const addTodo = value => {
  return dispatch => {
    return fetch("https://moocs-todo.herokuapp.com/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: value, status: "DOING" }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("addTodo ok!", response);
          const data = fetch("https://moocs-todo.herokuapp.com/api/tasks").then(
            response => response.json()
          );
          return data;
        }
      })
      .then(data => {
        return dispatch(receiveTodolistJson(data));
      })
      .catch(error => console.error("Error:", error));
  };
};

const deleteTodo = id => {
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          console.log("deleteTodo ok!", response);
          return dispatch({
            type: types.DELETE_TODO,
            id
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };
};

const toggleTodo = (id, status) => {
  let updatedStatus = status === "DOING" ? "DONE" : "DOING";
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: "PUT",
      body: JSON.stringify({ status: updatedStatus }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("toggleTodo ok!", response);
          return dispatch({
            type: types.TOGGLE_TODO,
            id
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };
};

const updateTodo = (id, title, status) => {
  console.log("updateTodo action");
  return dispatch => {
    return fetch(`https://moocs-todo.herokuapp.com/api/tasks/${id}/ `, {
      method: "PUT",
      body: JSON.stringify({ title: title, status }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("updateTodo ok!", response);
          return dispatch({
            type: types.UPDATE_TODO,
            id,
            title
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };
};

// const fetchTodolistJson = async () => {
//   const data = await fetch("https://moocs-todo.herokuapp.com/api/tasks").then(
//     response => response.json()
//   );
//   return dispatch => {
//     dispatch(receiveTodolistJson(data));
//   };
// };

const receiveTodolistJson = json => ({
  type: types.FETCH_TODOLIST_JSON,
  data: json
});

// test start

const fetchTaskDataEpic = action$ =>
  action$.pipe(
    ofType("FETCH_TASK_DATA"),
    // tap(r => console.log(r)),
    mergeMap(action =>
      from(axios.get("https://moocs-todo.herokuapp.com/api/tasks")).pipe(
        // tap(response => console.log(response.data)),
        map(result => {
          return fetchTaskDataSuccess(result.data);
        }),
        // mergeMap(result => {
        //   return of(fetchTaskDataSuccess(result.data), { type: "test1" });
        // }),
        catchError(error => {
          // console.log(error);
          // return fetchTaskDataFailed(error);
          return of(fetchTaskDataFailed(error)).pipe(
            tap(error => console.log(error))
          );
        })
      )
    )
  );
// const insertTaskDataEpic = action$ =>
//   action$.pipe(
//     ofType("FETCH_TASK_DATA"),
//     mergeMap(action =>
//       from(
//         axios.post("https://moocs-todo.herokuapp.com/api/tasks", {
//           title: action.value,
//           status: "DOING"
//         })
//       ).pipe(
//         map(result => {
//           return fetchTaskDataSuccess(result.data);
//         }),
//         catchError(error => {
//           return fetchTaskDataFailed(error);
//         })
//       )
//     )
//   );

const fetchTaskData = () => ({
  type: "FETCH_TASK_DATA"
});
const fetchTaskDataSuccess = json => {
  // console.log(json);
  return {
    type: "UPDATE_TASK_DATA",
    data: json
  };
};
const fetchTaskDataFailed = errorMsg => ({
  type: "ERROR_OCCUR",
  data: errorMsg
});
const postTaskData = (id, title, status) => ({
  type: "_TODO"
});
// test end

const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
const actions = {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  // fetchTodolistJson,
  receiveTodolistJson,
  setVisibilityFilter,
  fetchTaskData,
  fetchTaskDataSuccess
};
export default actions;
// import actions from './index

export const Epics = { fetchDataEpic, fetchTaskDataEpic };
