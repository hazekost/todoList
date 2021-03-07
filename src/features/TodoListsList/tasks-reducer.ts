import {TaskStatuses, TaskType, todoListsAPI} from '../../api/todoLists-API'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodoListsAC} from './todoLists-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
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
        },
        setTasksAC: (state, action: PayloadAction<{ todoListId: string, tasks: Array<TaskType> }>) => {
            state[action.payload.todoListId] = action.payload.tasks
        },
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
        })
    }
})

export const tasksReducer = slice.reducer
const {removeTaskAC, addTaskAC, updateTaskStatusAC, updateTaskTitleAC, setTasksAC} = slice.actions

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.getTasks(todoListId)
            .then((response) => {
                dispatch(setTasksAC({todoListId: todoListId, tasks: response.data.items}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }
}
export const removeTasksTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTaskAC({taskId: taskId, todolistId: todoListId}))
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