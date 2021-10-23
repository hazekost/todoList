import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../features/Login/auth-reducer";
import { tasksReducer } from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import { todoListsReducer } from "../features/TodoListsList/TodoList/todoLists-reducer";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>