import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todoLists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>