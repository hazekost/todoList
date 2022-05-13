import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML & CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React JS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "Graph QL", isDone: false },
    ])

    const removeTask = (id: string) => {
        let newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }
    const addTask = (title: string) => {
        setTasks([{ id: v1(), title, isDone: false }, ...tasks])
    }
    const changeTaskStatus = (id: string, status: boolean) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, isDone: status } : t))
    }

    let [filter, setFilter] = useState<FilterType>("all")

    let tasksForTodoList = tasks

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList title="What to do"
                tasks={tasksForTodoList}
                filter={filter}
                removeTask={removeTask}
                changeFilter={setFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus} />
        </div>
    );
}

export default App;
