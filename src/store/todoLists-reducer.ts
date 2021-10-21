import { Dispatch } from "redux"
import { todoAPI, TodoListType } from "../api/api"

export enum TODOLISTS_TYPES {
    ADD_TODO = "ADD_TODO", REMOVE_TODO = "REMOVE_TODO", CHANGE_TODO_TITLE = "CHANGE_TODO_TITLE",
    SET_TODOS = "SET_TODOS", CHANGE_TODO_FILTER = "CHANGE_TODO_FILTER"
}
export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
type TodoActionType = AddTodoListActionType | RemoveTodoListActionType
    | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType | SetTodoListsActionType

let initialTodoState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialTodoState, action: TodoActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case TODOLISTS_TYPES.ADD_TODO:
            return [{ ...action.data, filter: "all" }, ...state]
        case TODOLISTS_TYPES.REMOVE_TODO:
            return state.filter(i => i.id !== action.id)
        case TODOLISTS_TYPES.CHANGE_TODO_FILTER:
            return state.map(i => i.id === action.id ? { ...i, filter: action.filter } : i)
        case TODOLISTS_TYPES.CHANGE_TODO_TITLE:
            return state.map(i => i.id === action.id ? { ...i, title: action.title } : i)
        case TODOLISTS_TYPES.SET_TODOS:
            return action.todoLists.map(tl => ({ ...tl, filter: "all" }))
        default:
            return state
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export const addTodoListAC = (data: TodoListType) => ({ type: TODOLISTS_TYPES.ADD_TODO as const, data })
export const removeTodoListAC = (id: string) => ({ type: TODOLISTS_TYPES.REMOVE_TODO as const, id })
export const changeTodoListTitleAC = (id: string, title: string) => ({ type: TODOLISTS_TYPES.CHANGE_TODO_TITLE as const, id, title })
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({ type: TODOLISTS_TYPES.SET_TODOS as const, todoLists })
export const changeTodoListFilterAC = (id: string, filter: FilterType) => (
    { type: TODOLISTS_TYPES.CHANGE_TODO_FILTER as const, id, filter }
)

export const getTodos = () => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.getTodos().then(res => {
        dispatch(setTodoListsAC(res.data))
    })
}
export const deleteTodo = (id: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.deleteTodo(id).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC(id))
        }
    })
}
export const addTodo = (title: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.createTodo(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
        }
    })
}
export const changeTodoTitle = (id: string, title: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.updateTodoTitle(id, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(id, title))
        }
    })
}