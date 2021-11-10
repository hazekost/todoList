import { addTodoTC, deleteTodoTC } from '../todoLists-reducer';
import { updateTaskTC, createTaskTC, deleteTaskTC, getTasksTC, tasksReducer, TasksType } from './tasks-reducer';

let initialState: TasksType

beforeEach(() => {
    initialState = {
        "todolistId1": [
            { id: "1", todoListId: "todolistId1", title: "CSS", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" },
            { id: "2", title: "JS", todoListId: "todolistId1", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" },
            { id: "3", title: "React", todoListId: "todolistId1", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" },
            { id: "2", title: "milk", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" },
            { id: "3", title: "tea", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "", entityStatus: "idle" }

        ]
    }
})

test("correct task should be added to correct array", () => {

    let task = { id: "4", title: "new task", todoListId: "todolistId2", order: 0, status: 0, addedDate: "", startDate: "", deadline: "", priority: 0, description: "" }
    let endState = tasksReducer(initialState, createTaskTC.fulfilled({ task }, "requestID", { title: "new task", tlid: "todolistId2" }))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("new task");
})

test("correct task should be deleted from correct array", () => {

    let newState = tasksReducer(initialState, deleteTaskTC.fulfilled({ tlid: "todolistId1", taskid: "2" }, "requestID", { tlid: "todolistId1", taskid: "2" }))

    expect(newState["todolistId1"][1].title).toBe("React")
    expect(newState["todolistId1"].length).toBe(2)
    expect(newState["todolistId2"].length).toBe(3)
})

test("status of specified task should be changed", () => {

    let newState = tasksReducer(initialState, updateTaskTC.fulfilled({ tlid: "todolistId2", taskid: "1", model: { status: 1 } }, "requestID",
        { tlid: "todolistId2", taskid: "1", model: { status: 1 } }))

    expect(newState["todolistId2"][0].status).toBe(1)
    expect(newState["todolistId1"][0].status).toBe(0)
})

test("title of specified task should be changed", () => {

    let newState = tasksReducer(initialState, updateTaskTC.fulfilled({ tlid: "todolistId2", taskid: "2", model: { title: "new title" } }, "requestID",
        { tlid: "todolistId2", taskid: "2", model: { title: "new title" } }))

    expect(newState["todolistId2"][1].title).toBe("new title")
    expect(newState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {

    let action = addTodoTC.fulfilled({ id: "todoListId3", title: "new todo", order: -4, addedDate: "" }, "requestID", "todoListId3")

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

    let action = deleteTodoTC.fulfilled("todolistId2", "requestID", "todolistId2")

    let newTasksState = tasksReducer(initialState, action)

    const keys = Object.keys(newTasksState)

    expect(keys.length).toBe(1)
    expect(newTasksState["todolistId2"]).toBeUndefined()
})

test("task should be added for todoList", () => {

    const action = getTasksTC.fulfilled({ tlid: "todolistId2", tasks: initialState["todolistId2"] }, "requestId", "todolistId2")

    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": [],
    }, action)

    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].length).toBe(0);
})