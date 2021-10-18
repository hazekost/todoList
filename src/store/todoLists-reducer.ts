import { Dispatch } from "redux"
import { todoAPI, TodoListType } from "../todo-api/api"

export type FilterType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
type TodoActionType = AddTodoListActionType | RemoveTodoListActionType
    | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType | SetTodoListsActionType

let initialTodoState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialTodoState, action: TodoActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{ ...action.payload.data, filter: "all" }, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(i => i.id !== action.id)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(i => i.id === action.id ? { ...i, filter: action.filter } : i)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(i => i.id === action.id ? { ...i, title: action.title } : i)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({ ...tl, filter: "all" }))
        default:
            return state
    }
}

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

const addTodoListAC = (data: TodoListType) => ({ type: "ADD-TODOLIST" as const, payload: { data } })
const removeTodoListAC = (id: string) => ({ type: "REMOVE-TODOLIST" as const, id })
const changeTodoListTitleAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE" as const, id, title })
const setTodoListsAC = (todoLists: Array<TodoListType>) => ({ type: "SET-TODOLISTS" as const, todoLists })
export const changeTodoListFilterAC = (id: string, filter: FilterType) => ({ type: "CHANGE-TODOLIST-FILTER" as const, id, filter })

export const getTodo = () => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.getTodo().then(res => {
        dispatch(setTodoListsAC(res.data))
    })
}
export const deleteTodo = (id: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.deleteTodo(id).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC(id))
        }
    })
}
export const addTodo = (title: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.createTodo(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
        }
    })
}
export const changeTodoTitle = (id: string, title: string) => (dispatch: Dispatch<TodoActionType>) => {
    todoAPI.updateTodoTitle(id, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(id, title))
        }
    })
}