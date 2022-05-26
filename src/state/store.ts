import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store