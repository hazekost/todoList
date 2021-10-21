import { Dispatch } from "redux"
import { todoAPI, TodoListType } from "../api/api"
import { AppActionsType, RequestStatusType, setAppStatusAC } from "../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"

export enum TODOLISTS_TYPES {
    ADD_TODO = "TODOS/ADD_TODO", REMOVE_TODO = "TODOS/REMOVE_TODO", CHANGE_TODO_TITLE = "TODOS/CHANGE_TODO_TITLE",
    SET_TODOS = "TODOS/SET_TODOS", CHANGE_TODO_FILTER = "TODOS/CHANGE_TODO_FILTER",
    CHANGE_TODO_ENTITY_STATUS = "TODOS/CHANGE_TODO_ENTITY_STATUS",
}
export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
type TodoActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType | SetTodoListsActionType | AppActionsType | ChangeTodoListEntityStatusActionType

let initialTodoState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialTodoState, action: TodoActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case TODOLISTS_TYPES.ADD_TODO:
            return [{ ...action.data, filter: "all", entityStatus: "idle" }, ...state]
        case TODOLISTS_TYPES.REMOVE_TODO:
            return state.filter(i => i.id !== action.id)
        case TODOLISTS_TYPES.CHANGE_TODO_FILTER:
            return state.map(i => i.id === action.id ? { ...i, filter: action.filter } : i)
        case TODOLISTS_TYPES.CHANGE_TODO_TITLE:
            return state.map(i => i.id === action.id ? { ...i, title: action.title } : i)
        case TODOLISTS_TYPES.SET_TODOS:
            return action.todoLists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
        case TODOLISTS_TYPES.CHANGE_TODO_ENTITY_STATUS:
            return state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.status } : tl)
        default:
            return state
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatus>

export const addTodoListAC = (data: TodoListType) => ({ type: TODOLISTS_TYPES.ADD_TODO as const, data })
export const removeTodoListAC = (id: string) => ({ type: TODOLISTS_TYPES.REMOVE_TODO as const, id })
export const changeTodoListTitleAC = (id: string, title: string) => ({ type: TODOLISTS_TYPES.CHANGE_TODO_TITLE as const, id, title })
export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({ type: TODOLISTS_TYPES.SET_TODOS as const, todoLists })
export const changeTodoListFilterAC = (id: string, filter: FilterType) => (
    { type: TODOLISTS_TYPES.CHANGE_TODO_FILTER as const, id, filter }
)
export const changeTodoListEntityStatus = (id: string, status: RequestStatusType) => (
    { type: TODOLISTS_TYPES.CHANGE_TODO_ENTITY_STATUS as const, id, status }
)

export const getTodos = () => (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todoAPI.getTodos()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodo = (id: string) => (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodoListEntityStatus(id, "loading"))
    todoAPI.deleteTodo(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(id))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTodoListEntityStatus(id, "succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addTodo = (title: string) => (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todoAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const changeTodoTitle = (id: string, title: string) => (dispatch: Dispatch<TodoActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todoAPI.updateTodoTitle(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(id, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}