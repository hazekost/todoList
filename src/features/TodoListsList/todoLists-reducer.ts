import {todoListsAPI, TodolistType} from '../../api/todoLists-API'
import {Dispatch} from "redux";
import {
    ErrorUtilsDispatchType,
    RequestStatusType,
    setAppStatusAC,
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type setTodoListsActionType = ReturnType<typeof setTodoListsAC> | ErrorUtilsDispatchType
export type removeTodoListActionType = ReturnType<typeof removeTodolistAC> | ErrorUtilsDispatchType
    | changeTodolistEntityStatusActionType
export type addTodoListActionType = ReturnType<typeof addTodolistAC> | ErrorUtilsDispatchType
type changeTodoListTitleActionType = ReturnType<typeof changeTodolistTitleAC> | ErrorUtilsDispatchType
type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC> | ErrorUtilsDispatchType
type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType = changeTodoListTitleActionType | changeTodolistFilterActionType | setTodoListsActionType
    | removeTodoListActionType | addTodoListActionType | changeTodolistEntityStatusActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.item, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (item: TodolistType) => {
    return {type: 'ADD-TODOLIST', item} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
const setTodoListsAC = (todoLists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todoLists} as const
}
const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", id, entityStatus} as const
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<setTodoListsActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsAPI.getTodoLists()
            .then((response) => {
            dispatch(setTodoListsAC(response.data))
            dispatch(setAppStatusAC("succeeded"))
        })
    }
}
export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<removeTodoListActionType>) => {
        dispatch(changeTodolistEntityStatusAC(todoListId, "loading"))
        dispatch(setAppStatusAC("loading"))
        todoListsAPI.deleteTodolist(todoListId)
            .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todoListId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<addTodoListActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsAPI.createTodolist(title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolistAC(response.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(dispatch, response.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}
export const updateTodoListTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<changeTodoListTitleActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsAPI.updateTodolist(todoListId, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todoListId, title))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError(dispatch, response.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}