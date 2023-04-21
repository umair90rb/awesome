import { Todo, TodoActions } from "./todo.type";

export const AddTodoAction = (todo: Todo) => ({
    action: TodoActions.ADD_TODO,
    payload: {todo}
})

export const CompleteTodoAction = (id: number) => ({
    action: TodoActions.COMPLETE_TODO,
    payload: {id}
})

export const DeleteTodoAction = (id: number) => ({
    action: TodoActions.DELETE_TODO,
    payload: {id}
})

export const FetchUserTodoAction = (username: number) => ({
    action: TodoActions.FETCH_USER,
    payload: {username}
})

export const FetchUserTodoActionSuccess = (response: any) => ({
    action: TodoActions.FETCH_USER_SUCCESS,
    payload: {response}
})

export const FetchUserTodoActionFailure = (err: any) => ({
    action: TodoActions.FETCH_USER_FAILURE,
    payload: {err}
})