import {todoListsAPI, TodolistType} from '../api/todo-lists-a-p-i'
import {Dispatch} from "redux";

export type setTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type removeTodoListActionType = ReturnType<typeof removeTodolistAC>
export type addTodoListActionType = ReturnType<typeof addTodolistAC>
type changeTodoListTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = changeTodoListTitleActionType | changeTodolistFilterActionType | setTodoListsActionType
    | removeTodoListActionType | addTodoListActionType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.item, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (item: TodolistType) => {
    return {type: 'ADD-TODOLIST', item} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
const setTodoListsAC = (todoLists: Array<TodolistType>) => {
    return {type: "SET-TODOLISTS", todoLists} as const
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<setTodoListsActionType>) => {
        todoListsAPI.getTodoLists().then((response) => {
            dispatch(setTodoListsAC(response.data))
        })
    }
}
export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<removeTodoListActionType>) => {
        todoListsAPI.deleteTodolist(todoListId).then(() => {
            dispatch(removeTodolistAC(todoListId))
        })
    }
}
export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<addTodoListActionType>) => {
        todoListsAPI.createTodolist(title).then((response) => {
            dispatch(addTodolistAC(response.data.data.item))
        })
    }
}
export const updateTodoListTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch<changeTodoListTitleActionType>) => {
        todoListsAPI.updateTodolist(todoListId, title).then(() => {
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
    }
}