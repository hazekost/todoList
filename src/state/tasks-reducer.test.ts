import { v1 } from "uuid"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType } from "./tasks-reducer";
import { addTodoListAC, removeTodoListAC } from "./todoLists-reducer";

const todoListId1 = v1();
const todoListId2 = v1();
let startState: TasksType;

beforeEach(() => {
    startState = {
        [todoListId1]: [
            { id: "1", title: "HTML&CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "ReactJS", isDone: false }
        ],
        [todoListId2]: [
            { id: "1", title: "Bread", isDone: true },
            { id: "2", title: "Beer", isDone: false },
            { id: "3", title: "Chease", isDone: false }
        ]
    }
})

test("Task should be added", () => {

    const endState = tasksReducer(startState, addTaskAC(todoListId2, "New title"))

    expect(endState[todoListId2].length).toBe(4);
    expect(endState[todoListId2][0].title).toBe("New title");
})

test("correct task should be removed", () => {

    const endState = tasksReducer(startState, removeTaskAC(todoListId2, "1"))

    expect(endState[todoListId2].length).toBe(2);
    expect(endState[todoListId1].length).toBe(3);
    expect(endState[todoListId2][0].id).toBe("2");
})

test("correct task title should be changed", () => {

    const endState = tasksReducer(startState, changeTaskTitleAC(todoListId2, "1", "Changed title"))

    expect(endState[todoListId2].length).toBe(3);
    expect(endState[todoListId2][0].title).toBe("Changed title");
    expect(endState[todoListId1][0].title).toBe("HTML&CSS");
})

test("correct task status should be changed", () => {

    const endState = tasksReducer(startState, changeTaskStatusAC(todoListId2, "1", false))

    expect(endState[todoListId2].length).toBe(3);
    expect(endState[todoListId2][0].isDone).toBe(false);
    expect(endState[todoListId1][0].isDone).toBe(true);
})

test("new array should be added when new todolist is added", () => {

    const endState = tasksReducer(startState, addTodoListAC("New todoList"))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test("property with todolistId should be deleted", () => {

    const endState = tasksReducer(startState, removeTodoListAC(todoListId1))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(keys[0]).toBe(todoListId2);
    expect(endState[todoListId1]).toBeUndefined();
})