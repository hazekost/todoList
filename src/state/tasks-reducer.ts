import {TasksStateType} from '../App';
import {addTodoListActionType, removeTodoListActionType, setTodoListsActionType} from './todo-lists-reducer';
import {TaskStatuses, TaskType, todoListsAPI} from '../api/todo-lists-a-p-i'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type setTasksActionType = ReturnType<typeof setTasksAC>
type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTaskActionType = ReturnType<typeof addTaskAC>
type updateTaskStatusActionType = ReturnType<typeof updateTaskStatusAC>
type updateTaskTitleActionType = ReturnType<typeof updateTaskTitleAC>

type ActionsType = removeTaskActionType | addTodoListActionType | removeTodoListActionType
    | setTodoListsActionType | setTasksActionType | addTaskActionType | updateTaskStatusActionType
    | updateTaskTitleActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'UPDATE-TASK-TITLE': {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.item.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todoListId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
const updateTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'UPDATE-TASK-STATUS', status, todolistId, taskId} as const
}

const updateTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'UPDATE-TASK-TITLE', title, todolistId, taskId} as const
}

const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => {
    return {type: "SET-TASKS", todoListId, tasks} as const
}

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch<setTasksActionType>) => {
        todoListsAPI.getTasks(todoListId).then((response) => {
            dispatch(setTasksAC(todoListId, response.data.items))
        })
    }
}
export const removeTasksTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch<removeTaskActionType>) => {
        todoListsAPI.deleteTask(todoListId, taskId).then((response) => {
            dispatch(removeTaskAC(taskId, todoListId))
        })
    }
}
export const addTaskTC = (todoListId: string, taskTitle: string) => {
    return (dispatch: Dispatch<addTaskActionType>) => {
        todoListsAPI.createTask(todoListId, taskTitle).then((response) => {
            dispatch(addTaskAC(response.data.data.item))
        })
    }
}
export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch<updateTaskStatusActionType>, getState: () => AppRootStateType) => {
        let task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            todoListsAPI.updateTask(todoListId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                dispatch(updateTaskStatusAC(todoListId, taskId, status))
            })
        }
    }
}
export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch<updateTaskTitleActionType>, getState: () => AppRootStateType) => {
        let task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            todoListsAPI.updateTask(todoListId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                dispatch(updateTaskTitleAC(todoListId, taskId, title))
            })
        }
    }
}