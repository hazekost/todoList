import { tasksReducer } from './tasks-reducer';
import { combineReducers, createStore } from "redux";
import { todoListsReducer } from './todoLists-reducer';

const rootRuducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

export const store = createStore(rootRuducer);
export type AppStoreType = ReturnType<typeof rootRuducer>;

//@ts-ignore
window.store = store