import { ItemType } from "../todo-api/api"
import { AddTodoListActionType, RemoveTodoListActionType } from "./todoLists-reducer"

export type TasksType = {
    [key: string]: Array<ItemType>
}
type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

let initialTasksState: TasksType = {}

export const tasksReducer = (state: TasksType = initialTasksState, action: ActionType): TasksType => {
    switch (action.type) {
        case "ADD-TASK":
            return { ...state, [action.payload.data.todoListId]: [{ ...action.payload.data }, ...state[action.payload.data.todoListId]] }
        case "REMOVE-TASK":
            return { ...state, [action.tlid]: state[action.tlid].filter(t => t.id !== action.id) }
        case "CHANGE-TASK-STATUS":
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, status: action.status } : t) }
        case "CHANGE-TASK-TITLE":
            return { ...state, [action.tlid]: state[action.tlid].map(t => t.id === action.id ? { ...t, title: action.title } : t) }
        case "ADD-TODOLIST":
            return { ...state, [action.payload.data.id]: [] }
        case "REMOVE-TODOLIST":
            let stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (data: ItemType) => ({ type: "ADD-TASK" as const, payload: { data } })
export const removeTaskAC = (tlid: string, id: string) => ({ type: "REMOVE-TASK" as const, tlid, id })
export const changeTaskStatusAC = (tlid: string, id: string, status: number) => (
    { type: "CHANGE-TASK-STATUS" as const, tlid, id, status }
)
export const changeTaskTitleAC = (tlid: string, id: string, title: string) => (
    { type: "CHANGE-TASK-TITLE" as const, tlid, id, title }
)