import { v1 } from "uuid"

const todoListId1 = v1();
const todoListId2 = v1();

test("Task should be added", () => {

    const startState = {
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "RestApi", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: "Bread", isDone: true },
            { id: v1(), title: "Beer", isDone: false },
            { id: v1(), title: "Chease", isDone: false }
        ]
    }

})