import { ITodo, Action, ActionTypes } from "../actions";

export const todoReducer = (state: ITodo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};
