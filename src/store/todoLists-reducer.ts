import { TodoListType } from "../todo-api/api"

export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
type ActionType = AddTodoListActionType | RemoveTodoListActionType
    | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType | SetTodoListsActionType

let initialTodoState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialTodoState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{ ...action.payload.data, filter: "all" }, ...state]
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
type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export const addTodoListAC = (data: TodoListDomainType) => ({ type: "ADD-TODOLIST" as const, payload: { data } })
export const removeTodoListAC = (id: string) => ({ type: "REMOVE-TODOLIST" as const, id })
export const changeTodoListFilterAC = (id: string, filter: FilterType) => ({ type: "CHANGE-TODOLIST-FILTER" as const, id, filter })
export const changeTodoListTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE" as const, id, title })
const setTodoListsAC = (todoLists: Array<TodoListType>) => ({ type: "SET-TODOLISTS" as const, payload: { todoLists } })