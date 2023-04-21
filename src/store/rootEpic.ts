import { combineEpics } from "redux-observable";
import { pingEpic } from "./todo/todo.epic";

export const rootEpic = combineEpics(
    pingEpic
)