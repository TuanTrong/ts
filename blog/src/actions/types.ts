import { IFetchAction, IDeleteAction } from "./todoActions";

export enum ActionTypes {
  fetchTodos = "FETCH_TODOS",
  deleteTodo = "DELETE_TODO"
}

export type Action = IFetchAction | IDeleteAction;
