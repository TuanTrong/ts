import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

const url = "https://jsonplaceholder.typicode.com/todos";

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface IFetchAction {
  type: ActionTypes.fetchTodos;
  payload: ITodo[];
}

export interface IDeleteAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<ITodo[]>(url);

    dispatch<IFetchAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    });
  };
};

export const deleteTodo = (id: number): IDeleteAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};
