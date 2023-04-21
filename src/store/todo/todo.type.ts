import {Action} from 'redux'

export enum TodoActions {
    ADD_TODO = 'todo/add',
    COMPLETE_TODO = 'todo/complete',
    DELETE_TODO = 'todo/delete',
    FETCH_USER = 'todo/fetchUser',
    FETCH_USER_SUCCESS = 'todo/fetchUserSuccess',
    FETCH_USER_FAILURE = 'todo/fetchUserFailure'
}

export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

export interface AddTodoAction extends Action {
    payload: {
        todo: string;
        completed: boolean;
    }
}

export interface CompleteTodoAction extends Action {
    payload: {
        id: number
    }
}

export type DeleteTodoAction = CompleteTodoAction

export type TodosState =  {todos: Todo[], user: null, error: null};