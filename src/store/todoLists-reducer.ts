import { v1 } from "uuid"

export type FilterType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type ActionType = AddTodoListActionType | RemoveTodoListActionType
    | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export let todoListId1 = v1()
export let todoListId2 = v1()
let initialTodoListsState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialTodoListsState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...state, { id: action.id, title: action.title, filter: "all" }]
        case "REMOVE-TODOLIST":
            return state.filter(i => i.id !== action.id)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(i => i.id === action.id ? { ...i, filter: action.filter } : i)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(i => i.id === action.id ? { ...i, title: action.title } : i)
        default:
            return state
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>

export const addTodoListAC = (title: string) => ({ type: "ADD-TODOLIST" as const, title, id: v1() })
export const removeTodoListAC = (id: string) => ({ type: "REMOVE-TODOLIST" as const, id })
export const changeTodoListFilterAC = (id: string, filter: FilterType) => ({ type: "CHANGE-TODOLIST-FILTER" as const, id, filter })
export const changeTodoListTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE" as const, id, title })