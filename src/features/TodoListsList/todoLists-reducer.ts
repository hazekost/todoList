import {todoListsAPI, TodolistType} from '../../api/todoLists-API'
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC,} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todoLists",
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ todoListId: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ item: TodolistType }>) => {
            state.unshift({...action.payload.item, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodoListsAC: (state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) => {
            return action.payload.todoLists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todoListsReducer = slice.reducer

export const {
    removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
    changeTodolistFilterAC, setTodoListsAC, changeTodolistEntityStatusAC
} = slice.actions

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.getTodoLists()
            .then((response) => {
                dispatch(setTodoListsAC({todoLists: response.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}
export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC({id: todoListId, entityStatus: "loading"}))
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.deleteTodolist(todoListId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodolistAC({todoListId: todoListId}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.createTodolist(title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolistAC({item: response.data.data.item}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.updateTodolist(todoListId, title)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id: todoListId, title: title}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(dispatch, response.data)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}