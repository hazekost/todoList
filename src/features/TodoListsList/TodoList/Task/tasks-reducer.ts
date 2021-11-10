import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ItemType, todoAPI, UpdateDataTaskType } from "../../../../api/api"
import { RequestStatusType, setAppStatusAC } from "../../../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../../../utils/error-utils"
import { addTodoTC, getTodosTC, deleteTodoTC } from "../todoLists-reducer"
import { AppRootStateType } from "../../../../app/store"

// enum TASKS_TYPES {
//     ADD_TASK = "TASKS/ADD_TASK", REMOVE_TASK = "TASKS/REMOVE_TASK", CHANGE_TASK_TITLE = "TASKS/CHANGE_TASK_TITLE",
//     CHANGE_TASK_STATUS = "TASKS/CHANGE_TASK_STATUS", SET_TASKS = "TASKS/SET_TASKS", CHANGE_TASK_ENTITY_STATUS = "TASKS/CHANGE_TASK_ENTITY_STATUS"
// }

// type TasksActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
//     | AddTodoListActionType | RemoveTodoListActionType | SetTasksActionType | SetTodoListsActionType | ChangeTaskEntityStatusActionType

// export const tasksReducer = (state: TasksType = initialTasksState, action: TasksActionType): TasksType => {
//     switch (action.type) {
//         case TASKS_TYPES.ADD_TASK:
//             return { ...state, [action.task.todoListId]: [{ ...action.task, entityStatus: "idle" }, ...state[action.task.todoListId]] }
//         case TASKS_TYPES.REMOVE_TASK:
//             return { ...state, [action.tlid]: state[action.tlid].filter(t => t.id !== action.id) }
//         case TASKS_TYPES.CHANGE_TASK_STATUS:
//             return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, status: action.status } : t) }
//         case TASKS_TYPES.CHANGE_TASK_TITLE:
//             return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, title: action.title } : t) }
//         case addTodoListAC.type:
//             return { ...state, [action.payload.data.id]: [] }
//         case removeTodoListAC.type: {
//             let stateCopy = { ...state }
//             delete stateCopy[action.payload.id]
//             return stateCopy
//         }
//         case TASKS_TYPES.SET_TASKS:
//             return { ...state, [action.id]: action.tasks.map((t: any) => ({ ...t, entityStatus: "idle" })) }
//         case setTodoListsAC.type: {
//             let stateCopy = { ...state }
//             action.payload.todoLists.forEach((tl: any) => {
//                 stateCopy[tl.id] = []
//             })
//             return stateCopy
//         }
//         case TASKS_TYPES.CHANGE_TASK_ENTITY_STATUS:
//             return {
//                 ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.taskid
//                     ? { ...t, entityStatus: action.status }
//                     : t)
//             }
//         default:
//             return state
//     }
// }

// type AddTaskActionType = ReturnType<typeof addTaskAC>
// type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
// type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
// type SetTasksActionType = ReturnType<typeof setTasksAC>
// type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatus>

// export const addTaskAC = (task: ItemType) => (
//     { type: TASKS_TYPES.ADD_TASK as const, task }
// )
// export const removeTaskAC = (tlid: string, id: string) => (
//     { type: TASKS_TYPES.REMOVE_TASK as const, tlid, id }
// )
// export const changeTaskStatusAC = (tlid: string, id: string, status: number) => (
//     { type: TASKS_TYPES.CHANGE_TASK_STATUS as const, tlid, id, status }
// )
// export const changeTaskTitleAC = (tlid: string, id: string, title: string) => (
//     { type: TASKS_TYPES.CHANGE_TASK_TITLE as const, tlid, id, title }
// )
// const setTasksAC = (id: string, tasks: Array<ItemType>) => (
//     { type: TASKS_TYPES.SET_TASKS as const, tasks, id }
// )
// const changeTaskEntityStatus = (tlid: string, taskid: string, status: RequestStatusType) => (
//     { type: TASKS_TYPES.CHANGE_TASK_ENTITY_STATUS as const, tlid, taskid, status }
// )
/////////Thunk Creators
// export const getTasks = (id: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     todoAPI.getTasks(id)
//         .then(res => {
//             dispatch(setAppStatusAC({ status: "succeeded" }))
//             dispatch(setTasksAC({ id, tasks: res.data.items }))
//         })
//         .catch(err => {
//             dispatch(setAppStatusAC({ status: "failed" }))
//             handleServerNetworkError(err, dispatch)
//         })
// }
// export const deleteTask_ = (tlid: string, taskid: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "loading" }))
//     todoAPI.deleteTask(tlid, taskid)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "succeeded" }))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//                 dispatch(removeTaskAC({ tlid, id: taskid }))
//             } else {
//                 dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "failed" }))
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "failed" }))
//             handleServerNetworkError(err, dispatch)
//         })
// }
// export const createTask_ = (id: string, title: string) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     todoAPI.createTask(id, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(addTaskAC({ task: res.data.data.item }))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//             } else {
//                 dispatch(setAppStatusAC({ status: "failed" }))
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             dispatch(setAppStatusAC({ status: "failed" }))
//             handleServerNetworkError(err, dispatch)
//         })
// }
// export const _updateTaskTC = (tlid: string, taskid: string, model: UpdateDataTaskType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     let task = getState().tasks[tlid].find(t => t.id === taskid)
//     if (task) {
//         dispatch(setAppStatusAC({ status: "loading" }))
//         dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "loading" }))
//         todoAPI.updateTask(tlid, taskid, { ...task, ...model })
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "succeeded" }))
//                     dispatch(setAppStatusAC({ status: "succeeded" }))
//                     dispatch(updateTaskAC({ tlid, taskid: taskid, model }))
//                 } else {
//                     dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "failed" }))
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch(err => {
//                 dispatch(changeTaskEntityStatus({ tlid, id: taskid, status: "failed" }))
//                 handleServerNetworkError(err, dispatch)
//             })
//     }
// }

export const getTasksTC = createAsyncThunk<{ tlid: string, tasks: Array<ItemType> }, string>("tasks/getTasks", async (tlid: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todoAPI.getTasks(tlid)
    try {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { tlid, tasks: res.data.items }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const deleteTaskTC = createAsyncThunk<{ tlid: string, taskid: string }, { tlid: string, taskid: string }>("tasks/deleteTask", async (param: { tlid: string, taskid: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "loading" }))
    const res = await todoAPI.deleteTask(param.tlid, param.taskid)
    try {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "succeeded" }))
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return param
        } else {
            dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "failed" }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "failed" }))
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const createTaskTC = createAsyncThunk<{ task: ItemType }, { tlid: string, title: string }>("tasks/createTask", async (param: { tlid: string, title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await todoAPI.createTask(param.tlid, param.title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export const updateTaskTC = createAsyncThunk<{ tlid: string, taskid: string, model: UpdateDataTaskType }, { tlid: string, taskid: string, model: UpdateDataTaskType }>("tasks/updateTask", async (param: { tlid: string, taskid: string, model: UpdateDataTaskType }, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppRootStateType
    let task = state.tasks[param.tlid].find((t: ItemType) => t.id === param.taskid)
    if (!task) {
        return rejectWithValue(null)
    }
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "loading" }))

    const apiModel: UpdateDataTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model,
    }

    const res = await todoAPI.updateTask(param.tlid, param.taskid, apiModel)
    try {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "succeeded" }))
            dispatch(setAppStatusAC({ status: "succeeded" }))
            // dispatch(updateTaskAC({ tlid: param.tlid, taskid: param.taskid, model: param.model }))
            return param
        } else {
            dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "failed" }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        dispatch(changeTaskEntityStatus({ tlid: param.tlid, taskid: param.taskid, status: "failed" }))
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
})

export type TasksType = {
    [key: string]: Array<ItemType & { entityStatus: RequestStatusType }>
}

let initialTasksState: TasksType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialTasksState,
    reducers: {
        // addTaskAC: (state, action: PayloadAction<{ task: ItemType }>) => {
        //     state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
        // },
        // removeTaskAC: (state, action: PayloadAction<{ tlid: string, id: string }>) => {
        //     let index = state[action.payload.tlid].findIndex(t => t.id === action.payload.id)
        //     state[action.payload.tlid].splice(index, 1)
        // },
        // updateTaskAC: (state, action: PayloadAction<{ tlid: string, taskid: string, model: UpdateDataTaskType }>) => {
        //     let index = state[action.payload.tlid].findIndex(t => t.id === action.payload.taskid)
        //     state[action.payload.tlid][index] = { ...state[action.payload.tlid][index], ...action.payload.model }
        // },
        // setTasksAC: (state, action: PayloadAction<{ id: string, tasks: Array<ItemType> }>) => {
        //     state[action.payload.id] = action.payload.tasks.map(t => ({ ...t, entityStatus: "idle" }))
        // },
        changeTaskEntityStatus: (state, action: PayloadAction<{ tlid: string, taskid: string, status: RequestStatusType }>) => {
            let index = state[action.payload.tlid].findIndex(t => t.id === action.payload.taskid)
            state[action.payload.tlid][index].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoTC.fulfilled, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(deleteTodoTC.fulfilled, (state, action) => {
            delete state[action.payload]
        });
        builder.addCase(getTodosTC.fulfilled, (state, action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.tlid] = action.payload.tasks.map((t: ItemType) => ({ ...t, entityStatus: "idle" }))
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            let index = state[action.payload.tlid].findIndex(t => t.id === action.payload?.taskid)
            state[action.payload.tlid].splice(index, 1)
        });
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.tlid]
            const index = tasks.findIndex(t => t.id === action.payload.taskid)
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.model }
            }
        })
    }
})

export const tasksReducer = slice.reducer;
export const { changeTaskEntityStatus } = slice.actions