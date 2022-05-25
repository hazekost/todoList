import React from "react"
import { v1 } from "uuid"
import { FilterType } from "../App"

export type TodoListType = {
    id: string,
    title: string,
    filter: "all" | "active" | "completed"
}
type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterType
}
type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, { id: v1(), title: action.title, filter: "all" }]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        default:
            throw new Error("don't understand this type")
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST" as const,
        id
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST" as const,
        title
    }
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE" as const,
        id,
        title
    }
}
export const changeTodoListFilterAC = (id: string, filter: FilterType): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER" as const,
        id,
        filter
    }
}