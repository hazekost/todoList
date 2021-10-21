import { tasksReducer, TasksType } from "./tasks-reducer";
import { addTodoListAC, todoListsReducer, TodoListDomainType } from "./todoLists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC({ id: "1", title: "New TodoList", addedDate: "", order: 0 });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.data.id);
    expect(idFromTodolists).toBe(action.data.id);
});
