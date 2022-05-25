import { v1 } from "uuid"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksStateType } from "./tasks-reducer"
import { addTodoListAC, removeTodoListAC } from "./todolists-reducer"

test("correct task should be removed", () => {

    const todolistid1 = v1()
    const todolistid2 = v1()

    const startState: TasksStateType = {
        [todolistid1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
        ],
        [todolistid2]: [
            { id: "1", title: "Bread", isDone: false },
            { id: "2", title: "Milk", isDone: true },
            { id: "3", title: "Beer", isDone: false },
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistid1, "1"))

    expect(endState[todolistid1].length).toBe(1)
    expect(endState[todolistid2].length).toBe(3)
    expect(endState[todolistid1][0].id).toBe("2")
})

test("task should be added", () => {

    const todolistid1 = v1()
    const todolistid2 = v1()

    const startState: TasksStateType = {
        [todolistid1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
        ],
        [todolistid2]: [
            { id: "1", title: "Bread", isDone: false },
            { id: "2", title: "Milk", isDone: true },
            { id: "3", title: "Beer", isDone: false },
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(todolistid2, "new task"))

    expect(endState[todolistid1].length).toBe(2)
    expect(endState[todolistid2].length).toBe(4)
    expect(endState[todolistid2][0].title).toBe("new task")
    expect(endState[todolistid1][0].title).toBe("HTML & CSS")
})

test("task title should be changed", () => {

    const todolistid1 = v1()
    const todolistid2 = v1()

    const startState: TasksStateType = {
        [todolistid1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
        ],
        [todolistid2]: [
            { id: "1", title: "Bread", isDone: false },
            { id: "2", title: "Milk", isDone: true },
            { id: "3", title: "Beer", isDone: false },
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistid2, "2", "changed title"))

    expect(endState[todolistid2][1].title).toBe("changed title")
    expect(endState[todolistid1][1].title).toBe("JS")
})

test("task status should be changed", () => {

    const todolistid1 = v1()
    const todolistid2 = v1()

    const startState: TasksStateType = {
        [todolistid1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
        ],
        [todolistid2]: [
            { id: "1", title: "Bread", isDone: false },
            { id: "2", title: "Milk", isDone: true },
            { id: "3", title: "Beer", isDone: false },
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistid2, "2", false))

    expect(endState[todolistid2][1].isDone).toBe(false)
    expect(endState[todolistid1][1].isDone).toBe(true)
})

test("add task array when added new todo list", () => {

    const todolistid1 = v1()
    const todolistid2 = v1()

    const startState: TasksStateType = {
        [todolistid1]: [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
        ],
        [todolistid2]: [
            { id: "1", title: "Bread", isDone: false },
            { id: "2", title: "Milk", isDone: true },
            { id: "3", title: "Beer", isDone: false },
        ]
    }

    const endState = tasksReducer(startState, addTodoListAC("new todo"))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todolistid1 && k !== todolistid2)
    if (!newKey) {
        throw new Error("new key should be added")
    }


    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false }
        ]
    }

    const action = removeTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})