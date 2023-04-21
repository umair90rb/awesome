import { Epic, ofType } from 'redux-observable';
import {filter, delay, map, mergeMap, mapTo, takeUntil, of, tap, concat, } from 'rxjs'
import { TodoActions } from './todo.type';
import { CompleteTodoAction, DeleteTodoAction, FetchUserTodoActionSuccess } from './todo.action';
import { gitService } from '../../api/gitService';

const pingEpic: Epic = (action$, state$) => action$.pipe(
    ofType(TodoActions.ADD_TODO),
    mergeMap(({payload}) => (of(payload.todo)).pipe(
        gitService.fetchGitUser('umair90rb').pipe(
            
        ),
        map(() => {
            const id = state$.value.todos.filter(todo => todo.todo === payload.todo)[0].id;
            return id;
        }),
        map((id) => ({type: TodoActions.COMPLETE_TODO, payload: {id}})),
        delay(2000),
        map((id) => ({type: TodoActions.DELETE_TODO, payload: {id}}))
    ))
);

const deleteCompletedEpic: Epic = (action$) => action$.pipe(
    ofType(TodoActions.COMPLETE_TODO),
    mergeMap(({payload}) => of(payload.id).pipe(
        delay(1000),
    )),
)


export {pingEpic, deleteCompletedEpic};