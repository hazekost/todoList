import { addTodoListAC, removeTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, todoListsReducer } from "./todoLists-reducer"

let initialState: Array<{ id: string, title: string, filter: "all" | "active" | "completed" }>

beforeEach(() => {
  initialState = [
    { id: "1", title: "What to learn", filter: "all" },
    { id: "2", title: "What to buy", filter: "all" }
  ]
})

test("Add New TodoList to TodoLists", () => {

  let newState = todoListsReducer(initialState, addTodoListAC("new todolist"))

  expect(newState.length).toBe(3)
  expect(newState[2].title).toBe("new todolist")
})

test("Correct todoList should be removed", () => {

  let newState = todoListsReducer(initialState, removeTodoListAC("1"))

  expect(newState.length).toBe(1)
  expect(newState[0].id).toBe("2")
})

test("Correct filter of todolist should be changed", () => {

  let newState = todoListsReducer(initialState, changeTodoListFilterAC("1", "active"))

  expect(newState[0].filter).toBe("active")
  expect(initialState[0].filter).toBe("all")
})

test("Correct title of todolist should be changed", () => {

  let newState = todoListsReducer(initialState, changeTodoListTitleAC("1", "new title"))

  expect(newState[0].title).toBe("new title")
  expect(initialState[0].title).toBe("What to learn")
})