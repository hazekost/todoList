import {TaskStatuses, TaskType, todoListsAPI} from '../../api/todoLists-API'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodoListsAC} from './todoLists-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todoListsAPI.getTasks(todoListId);
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {todoListId, tasks: res.data.items}
    // .catch((err) => {
    //     handleServerNetworkError(thunkAPI.dispatch, err)
    // })
})
export const removeTasksTC = createAsyncThunk("tasks/removeTasks", async (param: { todoListId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    await todoListsAPI.deleteTask(param.todoListId, param.taskId)
    // if (response.data.resultCode === 0) {
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todoListId}
    // } else {
    //     handleServerAppError(thunkAPI.dispatch, response.data)
    // }
    // .catch((err) => {
    //     handleServerNetworkError(thunkAPI.dispatch, err)
    // })
})
export const addTaskTC = (todoListId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.createTask(todoListId, taskTitle)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(addTaskAC({task: response.data.data.item}))
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
export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            dispatch(setAppStatusAC({status: "loading"}))
            todoListsAPI.updateTask(todoListId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTaskStatusAC({todolistId: todoListId, taskId: taskId, status: status}))
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
}
export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            dispatch(setAppStatusAC({status: "loading"}))
            todoListsAPI.updateTask(todoListId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTaskTitleAC({todolistId: todoListId, taskId: taskId, title: title}))
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
}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskStatusAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, status: TaskStatuses }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        },
        updateTaskTitleAC: (state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.item.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        });
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            // if (action.payload) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload?.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
            // }
        });
    }
})

export const tasksReducer = slice.reducer
const {addTaskAC, updateTaskStatusAC, updateTaskTitleAC} = slice.actions