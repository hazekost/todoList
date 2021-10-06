import { v1 } from "uuid"

type FilterType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type StateType = Array<TodoListType>
type ActionType = AddTodoListActionType | RemoveTodoListActionType | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

let todoListId1 = v1()
let todoListId2 = v1()
let initialState: StateType = [
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" }
]

export const todoListsReducer = (state: StateType = initialState, action: ActionType): StateType => {
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