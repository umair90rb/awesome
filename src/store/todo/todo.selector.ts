import { RootReducerState } from "../rootReducer.types";

export const todoSelector = (state: RootReducerState) => state.todos.todos;