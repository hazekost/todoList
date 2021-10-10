import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType } from './tasks-reducer';
import { addTodoListAC, removeTodoListAC } from './todoLists-reducer';

let initialState: TasksType

beforeEach(() => {
    initialState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }

        ]
    }
})

test("correct task should be added to correct array", () => {

    let endState = tasksReducer(initialState, addTaskAC("todolistId2", "new task"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("new task");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test("correct task should be deleted from correct array", () => {

    let newState = tasksReducer(initialState, removeTaskAC("todolistId1", "2"))

    expect(newState["todolistId1"][1].title).toBe("React")
    expect(newState["todolistId1"].length).toBe(2)
    expect(newState["todolistId2"].length).toBe(3)
})

test("status of specified task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskStatusAC("todolistId2", "1", true))

    expect(newState["todolistId2"][0].isDone).toBe(true)
    expect(newState["todolistId1"][0].isDone).toBe(false)
})

test("title of specified task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskTitleAC("todolistId2", "2", "new title"))

    expect(newState["todolistId2"][1].title).toBe("new title")
    expect(newState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {

    let action = addTodoListAC("new todoList")

    let newTasksState = tasksReducer(initialState, action)

    const keys = Object.keys(newTasksState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw new Error("Key not found");

    }
    expect(keys.length).toBe(3)
    expect(newTasksState[newKey]).toBeDefined()
})

test("Correct array should be removed when todolist is removed", () => {

    let action = removeTodoListAC("todolistId2")

    let newTasksState = tasksReducer(initialState, action)

    const keys = Object.keys(newTasksState)

    expect(keys.length).toBe(1)
    expect(newTasksState["todolistId2"]).toBeUndefined()
})