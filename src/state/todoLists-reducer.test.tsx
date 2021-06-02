import { v1 } from "uuid"
import { TodoListType } from "../App"
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer } from "./todoLists-reducer"

let startState: Array<TodoListType>
const todoListID1 = v1();
const todoListID2 = v1();

beforeEach(() => {
    startState = [
        { id: todoListID1, title: "What to learn", filter: "all" },
        { id: todoListID2, title: "What to buy", filter: "all" }
    ]
})

test("New TodoList should be added", () => {

    let endState = todoListsReducer(startState, addTodoListAC("New Title"));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Title");
})

test("Correct todoList should be removed", () => {

    let endState = todoListsReducer(startState, removeTodoListAC(todoListID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
})

test("correct filter should be changed", () => {

    let endState = todoListsReducer(startState, changeTodoListFilterAC(todoListID1, "active"));

    expect(endState[0].filter).toBe("active");
    expect(endState[1].filter).toBe("all");
})

test("correct title should be changed", () => {

    let endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID1, "Changed title"));

    expect(endState[0].title).toBe("Changed title");
    expect(endState[1].title).toBe("What to buy");
})