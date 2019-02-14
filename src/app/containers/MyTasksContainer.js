import { connect } from "react-redux";
import Actions from "../actions";
import MyTasks from "../components/MyTasks";
import { Action } from "rxjs/internal/scheduler/Action";

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = {
  setVisibilityFilter: filter => Actions.setVisibilityFilter(filter),
  // fetchTodolistJson: () => Actions.fetchTodolistJson(),
  receiveTodolistJson: data => Actions.receiveTodolistJson(data),
  onTodoClick: (id, status) => Actions.toggleTodo(id, status),
  addTodo: value => Actions.addTodo(value),
  updateTodo: (id, title, status) => Actions.updateTodo(id, title, status),
  deleteTodo: id => Actions.deleteTodo(id),
  fetchTaskData: () => Actions.fetchTaskData()
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTasks);

export default TodoListContainer;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.status === "DONE");
    case "SHOW_ACTIVE":
      return todos.filter(t => t.status === "DOING");
  }
};
