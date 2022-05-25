import { v1 } from "uuid"
import { AddTodoListActionType, RemoveTodoListActionType } from "./todolists-reducer"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return { ...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId) }
        case "ADD-TASK":
            return { ...state, [action.todoId]: [{ id: v1(), title: action.title, isDone: false }, ...state[action.todoId]] }
        case "CHANGE-TASK-TITLE":
            return { ...state, [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? { ...t, title: action.title } : t) }
        case "CHANGE-TASK-STATUS":
            return { ...state, [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t) }
        case "ADD-TODOLIST":
            return { ...state, [action.id]: [] }
        case "REMOVE-TODOLIST":
            const newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            throw new Error("don't understand this type")
    }
}

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todoId: string
    taskId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    todoId: string
    title: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todoId: string
    taskId: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todoId: string
    taskId: string
    isDone: boolean
}

export const removeTaskAC = (todoId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK" as const,
        todoId,
        taskId
    }
}
export const addTaskAC = (todoId: string, title: string): AddTaskActionType => {
    return {
        type: "ADD-TASK" as const,
        todoId,
        title
    }
}
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE" as const,
        todoId,
        taskId,
        title
    }
}
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS" as const,
        todoId,
        taskId,
        isDone
    }
}