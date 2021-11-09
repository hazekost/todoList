import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { todoAPI, TodoListType } from "../../../api/api"
import { RequestStatusType, setAppStatusAC } from "../../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils"

// export enum TODOLISTS_TYPES {
//     ADD_TODO = "TODOS/ADD_TODO", REMOVE_TODO = "TODOS/REMOVE_TODO", CHANGE_TODO_TITLE = "TODOS/CHANGE_TODO_TITLE",
//     SET_TODOS = "TODOS/SET_TODOS", CHANGE_TODO_FILTER = "TODOS/CHANGE_TODO_FILTER",
//     CHANGE_TODO_ENTITY_STATUS = "TODOS/CHANGE_TODO_ENTITY_STATUS",
// }

// type TodoActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType
//     | ChangeTodoListTitleActionType | SetTodoListsActionType | ChangeTodoListEntityStatusActionType

// export const todoListsReducer = (state: Array<TodoListDomainType> = initialTodoState, action: TodoActionType): Array<TodoListDomainType> => {
//     switch (action.type) {
//         case TODOLISTS_TYPES.ADD_TODO:
//             return [{ ...action.data, filter: "all", entityStatus: "idle" }, ...state]
//         case TODOLISTS_TYPES.REMOVE_TODO:
//             return state.filter(i => i.id !== action.id)
//         case TODOLISTS_TYPES.CHANGE_TODO_FILTER:
//             return state.map(i => i.id === action.id ? { ...i, filter: action.filter } : i)
//         case TODOLISTS_TYPES.CHANGE_TODO_TITLE:
//             return state.map(i => i.id === action.id ? { ...i, title: action.title } : i)
//         case TODOLISTS_TYPES.SET_TODOS:
//             return action.todoLists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
//         case TODOLISTS_TYPES.CHANGE_TODO_ENTITY_STATUS:
//             return state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.status } : tl)
//         default:
//             return state
//     }
// }

// export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
// export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
// // type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
// // type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
// export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
// export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatusAC>

// export const addTodoListAC = (data: TodoListType) => ({ type: TODOLISTS_TYPES.ADD_TODO as const, data })
// export const removeTodoListAC = (id: string) => ({ type: TODOLISTS_TYPES.REMOVE_TODO as const, id })
// export const changeTodoListTitleAC = (id: string, title: string) => ({ type: TODOLISTS_TYPES.CHANGE_TODO_TITLE as const, id, title })
// export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({ type: TODOLISTS_TYPES.SET_TODOS as const, todoLists })
// export const changeTodoListFilterAC = (id: string, filter: FilterType) => (
//     { type: TODOLISTS_TYPES.CHANGE_TODO_FILTER as const, id, filter }
// )
// export const changeTodoListEntityStatus =AC (id: string, status: RequestStatusType) => (
//     { type: TODOLISTS_TYPES.CHANGE_TODO_ENTITY_STATUS as const, id, status }
// )

export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

let initialTodoState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: "todoLists",
    initialState: initialTodoState,
    reducers: {
        addTodoListAC: (state, action: PayloadAction<{ data: TodoListType }>) => {
            state.unshift({ ...action.payload.data, filter: "all", entityStatus: "idle" })
        },
        removeTodoListAC: (state, action: PayloadAction<{ id: string }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodoListsAC: (state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) => {
            return action.payload.todoLists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
    },
})

export const todoListsReducer = slice.reducer;
export const { addTodoListAC, changeTodoListEntityStatusAC, changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListAC, setTodoListsAC } = slice.actions


export const getTodos = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todoAPI.getTodos()
        .then(res => {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(setTodoListsAC({ todoLists: res.data }))
        })
        .catch(err => {
            console.dir(err)
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodo = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(changeTodoListEntityStatusAC({ id, status: "loading" }))
    todoAPI.deleteTodo(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListEntityStatusAC({ id, status: "succeeded" }))
                dispatch(removeTodoListAC({ id }))
                dispatch(setAppStatusAC({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodoListEntityStatusAC({ id, status: "failed" }))
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
            dispatch(changeTodoListEntityStatusAC({ id, status: "failed" }))
        })
}
export const addTodo = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todoAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({ data: res.data.data.item }))
                dispatch(setAppStatusAC({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const changeTodoTitle = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todoAPI.updateTodoTitle(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC({ id, title }))
                dispatch(setAppStatusAC({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}