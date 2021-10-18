import { Dispatch } from "redux"
import { ItemType, todoAPI } from "../todo-api/api"
import { AppRootStateType } from "./store"
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType } from "./todoLists-reducer"

export type TasksType = {
    [key: string]: Array<ItemType>
}
type TasksActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType | SetTasksActionType | SetTodoListsActionType

let initialTasksState: TasksType = {}

export const tasksReducer = (state: TasksType = initialTasksState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return { ...state, [action.task.todoListId]: [{ ...action.task }, ...state[action.task.todoListId]] }
        case "REMOVE-TASK":
            return { ...state, [action.tlid]: state[action.tlid].filter(t => t.id !== action.id) }
        case "CHANGE-TASK-STATUS":
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, status: action.status } : t) }
        case "CHANGE-TASK-TITLE":
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, title: action.title } : t) }
        case "ADD-TODOLIST":
            return { ...state, [action.payload.data.id]: [] }
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TASKS":
            return { ...state, [action.id]: [...action.tasks] }
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        default:
            return state
    }
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksActionType = ReturnType<typeof setTasks>

const addTaskAC = (task: ItemType) => ({ type: "ADD-TASK" as const, task })
const removeTaskAC = (tlid: string, id: string) => ({ type: "REMOVE-TASK" as const, tlid, id })
const changeTaskStatusAC = (tlid: string, id: string, status: number) => (
    { type: "CHANGE-TASK-STATUS" as const, tlid, id, status }
)
const changeTaskTitleAC = (tlid: string, id: string, title: string) => (
    { type: "CHANGE-TASK-TITLE" as const, tlid, id, title }
)
const setTasks = (id: string, tasks: Array<ItemType>) => ({ type: "SET-TASKS" as const, tasks, id })

export const getTasks = (id: string) => (dispatch: Dispatch<TasksActionType>) => {
    todoAPI.getTasks(id).then(res => {
        dispatch(setTasks(id, res.data.items))
    })
}
export const createTask = (id: string, title: string) => (dispatch: Dispatch<TasksActionType>) => {
    todoAPI.createTask(id, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
        }
    })
}
export const deleteTask = (tlid: string, taskid: string) => (dispatch: Dispatch<TasksActionType>) => {
    todoAPI.deleteTask(tlid, taskid).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(tlid, taskid))
        }
    })
}
export const setTaskStatus = (tlid: string, taskid: string, status: number) => (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
    let task = getState().tasks[tlid].find(t => t.id === taskid)
    if (task) {
        todoAPI.updateTask(tlid, taskid, { ...task, status }).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskStatusAC(tlid, taskid, status))
            }
        })
    }
}
export const setTaskTitle = (tlid: string, taskid: string, title: string) => (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
    let task = getState().tasks[tlid].find(t => t.id === taskid)
    if (task) {
        todoAPI.updateTask(tlid, taskid, { ...task, title }).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(tlid, taskid, title))
            }
        })
    }
}