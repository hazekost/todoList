import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { v1 } from "uuid"
import { TasksType } from "../App"
import { addTodoListAC, removeTodoListAC } from './todoLists-reducer';

let initialState: TasksType
const todoListId1 = v1()
const todoListId2 = v1()

beforeEach(() => {
    initialState = {
        [todoListId1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "ReactJS", isDone: false }
        ],
        [todoListId2]: [
            { id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Bread", isDone: false }
        ]
    }
})

test("New task should be added", () => {

    let newState = tasksReducer(initialState, addTaskAC("new task", todoListId2))

    expect(newState[todoListId2][2].title).toBe("new task")
    expect(newState[todoListId2].length).toBe(3)
})

test("Correct task should be removed", () => {

    let newState = tasksReducer(initialState, removeTaskAC(todoListId1, "2"))

    expect(newState[todoListId1][1].title).toBe("ReactJS")
    expect(newState[todoListId1].length).toBe(2)
    expect(newState[todoListId2].length).toBe(2)
})

test("Status of correct task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskStatusAC(todoListId2, "2", true))

    expect(newState[todoListId2][1].isDone).toBe(true)
    expect(newState[todoListId2].length).toBe(2)
})

test("Title of correct task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskTitleAC(todoListId2, "2", "new title"))

    expect(newState[todoListId2][1].title).toBe("new title")
    expect(newState[todoListId2].length).toBe(2)
})

test("New array should be added when new todolist is added", () => {

    let action = addTodoListAC("new todoList")

    let newTasksState = tasksReducer(initialState, action)

    const keys = Object.keys(newTasksState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw new Error("Key not found");

    }
    expect(keys.length).toBe(3)
    expect(newTasksState[newKey]).toBeDefined()
})

test("Correct array should be removed when todolist is removed", () => {

    let action = removeTodoListAC(todoListId2)

    let newTasksState = tasksReducer(initialState, action)

    const keys = Object.keys(newTasksState)

    expect(keys.length).toBe(1)
    expect(newTasksState[todoListId2]).toBeUndefined()
})