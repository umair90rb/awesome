import { AddTodoAction, CompleteTodoAction, TodoActions, TodosState } from "./todo.type"

const initialState: TodosState = {todos:[{id: 1, todo: 'first todo', completed: true}], user: null, error: null}

export const todos = (state = initialState, action) => {
    switch (action.type) {
        case TodoActions.FETCH_USER:
            return {...state, user: 'fetching' }
        case TodoActions.FETCH_USER_SUCCESS:
            return {...state, user: action.payload}
        case TodoActions.FETCH_USER_FAILURE:
            return {...state, error: action.payload}
        case TodoActions.ADD_TODO:
            return [...state.todos, {...(action as AddTodoAction).payload, id: state.todos.length + 1}]
        case TodoActions.COMPLETE_TODO:
            return {...state, todos: state.todos.map((todo, i) => {
                if(todo.id === (action as CompleteTodoAction).payload.id) {
                    return {...todo, completed: true};
                } else {
                    return todo;
                }
            })}
        case TodoActions.DELETE_TODO:
            const copy = [...state.todos];
            const index = copy.findIndex(todo => todo.id === action.payload.id)
            copy.splice(index, 1);
            return index < 0 ? state : {...state, todos: [...copy]}
        default:
            return state;
    }
}

