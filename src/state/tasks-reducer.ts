import { v1 } from "uuid";
import { TasksType } from "../App";
import { AddTodoListActionType, RemoveTodoListActionType } from "./todoLists-reducer";

type AddTaskActionType = {
    type: "ADD-TASK"
    tlID: string
    title: string
    taskID: string
}
type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    tlID: string
    taskID: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    tlID: string
    title: string
    taskID: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    tlID: string
    isDone: boolean
    taskID: string
}
type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TASK':
            return { ...state, [action.tlID]: [{ id: action.taskID, title: action.title, isDone: false }, ...state[action.tlID]] };
        case 'REMOVE-TASK':
            return { ...state, [action.tlID]: state[action.tlID].filter(t => t.id !== action.taskID) };
        case "CHANGE-TASK-TITLE":
            return { ...state, [action.tlID]: [...state[action.tlID].map(t => t.id === action.taskID ? { ...t, title: action.title } : t)] };
        case "CHANGE-TASK-STATUS":
            return { ...state, [action.tlID]: [...state[action.tlID].map(t => t.id === action.taskID ? { ...t, isDone: action.isDone } : t)] };
        case "ADD-TODOLIST":
            return { ...state, [action.id]: [] };
        case "REMOVE-TODOLIST":
            let stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        default:
            throw new Error("I don't understand this type")
    }
}

export const addTaskAC = (tlID: string, title: string): AddTaskActionType => {
    return { type: "ADD-TASK" as const, tlID, title, taskID: v1() }
}
export const removeTaskAC = (tlID: string, taskID: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK" as const, tlID, taskID }
}
export const changeTaskTitleAC = (tlID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE" as const, tlID, taskID, title }
}
export const changeTaskStatusAC = (tlID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS" as const, tlID, taskID, isDone }
}