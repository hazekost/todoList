import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId1, title: "What to Learn", filter: "all" },
        { id: todoListId2, title: "What to Buy", filter: "all" },
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            { id: v1(), title: "HTML & CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React JS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "Graph QL", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: "Bread", isDone: false },
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Beer", isDone: false },
            { id: v1(), title: "Cheese", isDone: true },
        ]
    })

    const removeTask = (tlId: string, id: string) => {
        setTasks({ ...tasks, [tlId]: tasks[tlId].filter((t: TaskType) => t.id !== id) })
    }
    const addTask = (tlId: string, title: string) => {
        setTasks({ ...tasks, [tlId]: [{ id: v1(), title, isDone: false }, ...tasks[tlId]] })
    }
    const changeTaskStatus = (tlId: string, taskId: string, status: boolean) => {
        setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === taskId ? { ...t, isDone: status } : t) })
    }
    const changeFilter = (id: string, filter: FilterType) => {
        setTodoLists(todoLists.map(tl => tl.id === id ? { ...tl, filter } : tl))
    }
    const removeTodoList = (id: string) => {
        delete tasks[id]
        setTodoLists(todoLists.filter(tl => tl.id !== id))
    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                let tasksForTodoList = tasks[tl.id]

                if (tl.filter === "active") {
                    tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                }

                return <TodoList key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList} />
            })}
        </div>
    );
}

export default App;
