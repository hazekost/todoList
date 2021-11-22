import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../features/Auth/auth-reducer";
import { tasksReducer } from "../features/TodoListsList/TodoList/Task/tasks-reducer";
import { todoListsReducer } from "../features/TodoListsList/TodoList/todoLists-reducer";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))


//with redux toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch();

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [dispatch, actions]);

    return boundActions;
}