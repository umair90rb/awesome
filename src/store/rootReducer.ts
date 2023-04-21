import { combineReducers } from "redux";
import {todos} from "./todo/todo.reducer";
import { RootReducerState } from "./rootReducer.types";

export default combineReducers<RootReducerState>({todos})