import { combineReducers } from "redux";
import { todoReducer } from "./todosReducer";
import { ITodo } from "../actions";

export interface IAppState {
  todos: ITodo[];
}

export const reducers = combineReducers<IAppState>({
  todos: todoReducer
});
