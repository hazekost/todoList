import { Dispatch } from "redux"
import { ItemType, todoAPI } from "../../../../api/api"
import { AppActionsType, RequestStatusType, setAppStatusAC } from "../../../../app/app-reducer"
import { AppRootStateType } from "../../../../app/store"
import { handleServerAppError, handleServerNetworkError } from "../../../../utils/error-utils"
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType, TODOLISTS_TYPES } from "../todoLists-reducer"

enum TASKS_TYPES {
    ADD_TASK = "TASKS/ADD_TASK", REMOVE_TASK = "TASKS/REMOVE_TASK", CHANGE_TASK_TITLE = "TASKS/CHANGE_TASK_TITLE",
    CHANGE_TASK_STATUS = "TASKS/CHANGE_TASK_STATUS", SET_TASKS = "TASKS/SET_TASKS", CHANGE_TASK_ENTITY_STATUS = "TASKS/CHANGE_TASK_ENTITY_STATUS"
}
export type TasksType = {
    [key: string]: Array<ItemType & { entityStatus: RequestStatusType }>
}
type TasksActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType | SetTasksActionType | SetTodoListsActionType | AppActionsType
    | ChangeTaskEntityStatusActionType

let initialTasksState: TasksType = {}

export const tasksReducer = (state: TasksType = initialTasksState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case TASKS_TYPES.ADD_TASK:
            return { ...state, [action.task.todoListId]: [{ ...action.task, entityStatus: "idle" }, ...state[action.task.todoListId]] }
        case TASKS_TYPES.REMOVE_TASK:
            return { ...state, [action.tlid]: state[action.tlid].filter(t => t.id !== action.id) }
        case TASKS_TYPES.CHANGE_TASK_STATUS:
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, status: action.status } : t) }
        case TASKS_TYPES.CHANGE_TASK_TITLE:
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, title: action.title } : t) }
        case TODOLISTS_TYPES.ADD_TODO:
            return { ...state, [action.data.id]: [] }
        case TODOLISTS_TYPES.REMOVE_TODO: {
            let stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        case TASKS_TYPES.SET_TASKS:
            return { ...state, [action.id]: action.tasks.map(t => ({ ...t, entityStatus: "idle" })) }
        case TODOLISTS_TYPES.SET_TODOS: {
            let stateCopy = { ...state }
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case TASKS_TYPES.CHANGE_TASK_ENTITY_STATUS:
            return {
                ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.taskid
                    ? { ...t, entityStatus: action.status }
                    : t)
            }
        default:
            return state
    }
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>
type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatus>

export const addTaskAC = (task: ItemType) => (
    { type: TASKS_TYPES.ADD_TASK as const, task }
)
export const removeTaskAC = (tlid: string, id: string) => (
    { type: TASKS_TYPES.REMOVE_TASK as const, tlid, id }
)
export const changeTaskStatusAC = (tlid: string, id: string, status: number) => (
    { type: TASKS_TYPES.CHANGE_TASK_STATUS as const, tlid, id, status }
)
export const changeTaskTitleAC = (tlid: string, id: string, title: string) => (
    { type: TASKS_TYPES.CHANGE_TASK_TITLE as const, tlid, id, title }
)
const setTasksAC = (id: string, tasks: Array<ItemType>) => (
    { type: TASKS_TYPES.SET_TASKS as const, tasks, id }
)
const changeTaskEntityStatus = (tlid: string, taskid: string, status: RequestStatusType) => (
    { type: TASKS_TYPES.CHANGE_TASK_ENTITY_STATUS as const, tlid, taskid, status }
)

export const getTasks = (id: string) => (dispatch: Dispatch<TasksActionType>) => {
    todoAPI.getTasks(id)
        .then(res => {
            dispatch(setTasksAC(id, res.data.items))
        })
        .catch(err => {
            handleServerNetworkError(err.response.data, dispatch)
        })
}
export const createTask = (id: string, title: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todoAPI.createTask(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err.response.data, dispatch)
        })
}
export const deleteTask = (tlid: string, taskid: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatus(tlid, taskid, "loading"))
    todoAPI.deleteTask(tlid, taskid)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(tlid, taskid))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(changeTaskEntityStatus(tlid, taskid, "succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
            }
        })
        .catch(err => {
            handleServerNetworkError(err.response.data, dispatch)
            dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
        })
}
export const setTaskStatus = (tlid: string, taskid: string, status: number) => (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
    let task = getState().tasks[tlid].find(t => t.id === taskid)
    if (task) {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTaskEntityStatus(tlid, taskid, "loading"))
        todoAPI.updateTask(tlid, taskid, { ...task, status })
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(tlid, taskid, status))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTaskEntityStatus(tlid, taskid, "succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
                }
            })
            .catch(err => {
                handleServerNetworkError(err.response.data, dispatch)
                dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
            })
    }
}
export const setTaskTitle = (tlid: string, taskid: string, title: string) => (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
    let task = getState().tasks[tlid].find(t => t.id === taskid)
    if (task) {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTaskEntityStatus(tlid, taskid, "loading"))
        todoAPI.updateTask(tlid, taskid, { ...task, title })
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(tlid, taskid, title))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTaskEntityStatus(tlid, taskid, "succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
                }
            })
            .catch(err => {
                handleServerNetworkError(err.response.data, dispatch)
                dispatch(changeTaskEntityStatus(tlid, taskid, "failed"))
            })
    }
}