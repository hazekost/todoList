import { FilterValuesType, TodoListType } from "../App";

type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    id: string
    title: string
}
type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER"
    id: string
    filter: FilterValuesType
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    id: string
    title: string
}

type ActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [...state, { id: action.id, title: action.title, filter: "all" }];
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);
        case 'CHANGE-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl);
        default:
            throw new Error("I don't understand this type")
    }
}

export const addTodoListAC = (id: string, title: string) => {
    return { type: "ADD-TODOLIST" as const, id, title }
}
export const removeTodoListAC = (id: string) => {
    return { type: "REMOVE-TODOLIST" as const, id }
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: "CHANGE-FILTER" as const, id, filter }
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return { type: "CHANGE-TITLE" as const, id, title }
}
