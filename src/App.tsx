import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type FilterType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML & CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "React JS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "Graph QL", isDone: false },
    ])

    function removeTask(id: number) {
        let newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
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
            <TodoList title="What to do" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={setFilter} />
        </div>
    );
}

export default App;
