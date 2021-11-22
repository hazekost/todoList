import { asyncActions as todoAsyncActions } from "./TodoList/todoLists-reducer";
import { asyncActions as tasksAsyncActions } from "./TodoList/Task/tasks-reducer"
import { slice } from "./TodoList/todoLists-reducer";
import { TodoListsList } from "./TodoListsList"

const todoListsActions = {
    ...todoAsyncActions,
    ...slice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
}

export {
    todoListsActions,
    tasksActions,
    TodoListsList,
}