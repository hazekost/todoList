import { v1 } from "uuid"

export type FilterType = "all" | "active" | "completed"
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}
type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodoListType> = [], action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{ id: action.id, title: action.title, filter: "all" }, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        default:
            return state
    }
}

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    id: string
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

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST" as const,
        id
    }
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST" as const,
        title,
        id: v1()
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