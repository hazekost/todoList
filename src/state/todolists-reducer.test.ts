import { v1 } from "uuid"
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer, TodoListType } from "./todolists-reducer"

let todolistid1: string
let todolistid2: string
let todolistid3: string

let startState: Array<TodoListType>

beforeEach(() => {

    todolistid1 = v1()
    todolistid2 = v1()
    todolistid3 = v1()
    startState = [
        { id: todolistid1, title: "What to Learn", filter: "all" },
        { id: todolistid2, title: "What to Buy", filter: "all" },
        { id: todolistid3, title: "What to Eat", filter: "all" },
    ]

})

test("correct todoList must be removed", () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistid2))

    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todolistid3)
})

test("new todolist must be added", () => {

    const endState = todoListsReducer(startState, addTodoListAC("New Todo"))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe("New Todo")
})

test("correct todolist title should be changed", () => {

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todolistid2, "Changed Title"))

    expect(endState.length).toBe(3)
    expect(endState[1].title).toBe("Changed Title")
    expect(endState[0].title).toBe("What to Learn")
})

test("change filter for correct todolist", () => {

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistid2, "completed"))

    expect(endState.length).toBe(3)
    expect(endState[1].filter).toBe("completed")
    expect(endState[0].filter).toBe("all")
})