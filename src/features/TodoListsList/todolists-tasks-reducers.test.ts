import { tasksReducer, TasksType } from "./TodoList/Task/tasks-reducer";
import { addTodoTC, todoListsReducer, TodoListDomainType } from "./TodoList/todoLists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    const action = addTodoTC.fulfilled({ id: "1", title: "New TodoList", addedDate: "", order: 0 }, "requestID", "1");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});
