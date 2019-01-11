import { connect } from 'react-redux';
import Actions from '../actions';
import MyTasks from "../components/MyTasks";

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = {
  setVisibilityFilter: filter => Actions.setVisibilityFilter(filter),
  fetchTodolistJson: data => Actions.fetchTodolistJson(data),
  onTodoClick: id => Actions.toggleTodo(id),
  addTodo: value => Actions.addTodo(value),
  deleteTodo: id => Actions.deleteTodo(id),
}

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTasks)

export default TodoListContainer;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.status === "DONE")
    case 'SHOW_ACTIVE':
      return todos.filter(t => t.status === "DOING")
  }
}