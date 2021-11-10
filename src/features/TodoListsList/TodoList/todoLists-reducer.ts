import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
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

// let initialTodoState: Array<TodoListDomainType> = []

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

// export const getTodos = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     todoAPI.getTodos()
//         .then(res => {
//             dispatch(setAppStatusAC({ status: "succeeded" }))
//             dispatch(setTodoListsAC({ todoLists: res.data }))
//         })
//         .catch(err => {
//             console.dir(err)
//             handleServerNetworkError(err, dispatch)
//         })
// }
// export const deleteTodo = (id: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     dispatch(changeTodoListEntityStatusAC({ id, status: "loading" }))
//     todoAPI.deleteTodo(id)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(changeTodoListEntityStatusAC({ id, status: "succeeded" }))
//                 dispatch(removeTodoListAC({ id }))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//                 dispatch(changeTodoListEntityStatusAC({ id, status: "failed" }))
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//             dispatch(changeTodoListEntityStatusAC({ id, status: "failed" }))
//         })
// }
// export const addTodo = (title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     todoAPI.createTodo(title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTodoListAC({ data: res.data.data.item }))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }
// export const changeTodoTitle = (id: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     todoAPI.updateTodoTitle(id, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(changeTodoListTitleAC({ id, title }))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export const getTodosTC = createAsyncThunk<Array<TodoListType>, undefined>("todo/getTodos", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todoAPI.getTodos()
    try {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        // dispatch(setTodoListsAC({ todoLists: res.data }))
        return res.data
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const deleteTodoTC = createAsyncThunk<string, string>("todo/deleteTodo", async (tlid, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(changeTodoListEntityStatusAC({ id: tlid, status: "loading" }))
    const res = await todoAPI.deleteTodo(tlid)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(changeTodoListEntityStatusAC({ id: tlid, status: "succeeded" }))
            // dispatch(removeTodoListAC({ id: tlid }))
            return tlid
        } else {
            dispatch(changeTodoListEntityStatusAC({ id: tlid, status: "failed" }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        dispatch(changeTodoListEntityStatusAC({ id: tlid, status: "failed" }))
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const addTodoTC = createAsyncThunk<TodoListType, string>("todo/addTodo", async (title, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todoAPI.createTodo(title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            // dispatch(addTodoListAC({ data: res.data.data.item }))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const changeTodoTitleTC = createAsyncThunk<{ tlid: string, title: string }, { tlid: string, title: string }>("todo/changeTodoTitle", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todoAPI.updateTodoTitle(param.tlid, param.title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            // dispatch(changeTodoListTitleAC({ ...param }))
            return { ...param }
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "todoLists",
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        // addTodoListAC: (state, action: PayloadAction<{ data: TodoListType }>) => {
        //     state.unshift({ ...action.payload.data, filter: "all", entityStatus: "idle" })
        // },
        // removeTodoListAC: (state, action: PayloadAction<{ id: string }>) => {
        //     let index = state.findIndex(tl => tl.id === action.payload.id)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        // },
        // changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
        //     let index = state.findIndex(tl => tl.id === action.payload.id)
        //     state[index].title = action.payload.title
        // },
        // setTodoListsAC: (state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) => {
        //     return action.payload.todoLists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
        // },
        changeTodoListFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            let index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(getTodosTC.fulfilled, (state, action) => {
            return action.payload.map((tl: TodoListType) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        });
        builder.addCase(deleteTodoTC.fulfilled, (state, action) => {
            let index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(addTodoTC.fulfilled, (state, action) => {
            state.unshift({ ...action.payload, filter: "all", entityStatus: "idle" })
        });
        builder.addCase(changeTodoTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.tlid)
            state[index].title = action.payload.title
        })
    }
})

export const todoListsReducer = slice.reducer;
export const { changeTodoListEntityStatusAC, changeTodoListFilterAC } = slice.actions