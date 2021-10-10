import { addTodoListAC, removeTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, todoListsReducer, TodoListType } from "./todoLists-reducer"

let initialState: Array<TodoListType>

beforeEach(() => {
  initialState = [
    { id: "1", title: "What to learn", filter: "all" },
    { id: "2", title: "What to buy", filter: "all" }
  ]
})

test("new todolist should be added", () => {

  let endState = todoListsReducer(initialState, addTodoListAC("new todolist"))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe("new todolist")
})

test("correct todolist should be removed", () => {

  let endState = todoListsReducer(initialState, removeTodoListAC("1"))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("2")
})

test("correct filter of todolist should be changed", () => {

  let endState = todoListsReducer(initialState, changeTodoListFilterAC("1", "active"))

  expect(endState[0].filter).toBe("active")
  expect(initialState[0].filter).toBe("all")
})

test("correct title of todolist should be changed", () => {

  let endState = todoListsReducer(initialState, changeTodoListTitleAC("1", "new title"))

  expect(endState[0].title).toBe("new title")
  expect(initialState[0].title).toBe("What to learn")
})