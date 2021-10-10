import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todoLists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>