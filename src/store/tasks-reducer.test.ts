import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType } from './tasks-reducer';
import { addTodoListAC, removeTodoListAC } from './todoLists-reducer';

let initialState: TasksType

beforeEach(() => {
    initialState = {
        "todolistId1": [
            { id: "1", todoListId: "todolistId1", title: "CSS", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" },
            { id: "2", title: "JS", todoListId: "todolistId1", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" },
            { id: "3", title: "React", todoListId: "todolistId1", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" },
            { id: "2", title: "milk", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" },
            { id: "3", title: "tea", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" }

        ]
    }
})

test("correct task should be added to correct array", () => {

    let endState = tasksReducer(initialState, addTaskAC({ id: "4", title: "new task", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" }))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("new task");
})

test("correct task should be deleted from correct array", () => {

    let newState = tasksReducer(initialState, removeTaskAC("todolistId1", "2"))

    expect(newState["todolistId1"][1].title).toBe("React")
    expect(newState["todolistId1"].length).toBe(2)
    expect(newState["todolistId2"].length).toBe(3)
})

test("status of specified task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskStatusAC("todolistId2", "1", 1))

    expect(newState["todolistId2"][0].status).toBe(1)
    expect(newState["todolistId1"][0].status).toBe(0)
})

test("title of specified task should be changed", () => {

    let newState = tasksReducer(initialState, changeTaskTitleAC("todolistId2", "2", "new title"))

    expect(newState["todolistId2"][1].title).toBe("new title")
    expect(newState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {

    let action = addTodoListAC({ id: "todoListId3", title: "new todo", order: -4, addedDate: "" })

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