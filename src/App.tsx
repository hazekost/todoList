import { TodoList } from "./TodoList"
import './App.css';
import { useState } from "react";
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {

  let [filter, setFilter] = useState<FilterValuesType>("all")
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "RestApi", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ])

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }
  const addTask = (title: string) => {
    setTasks([{ id: v1(), title: title, isDone: false }, ...tasks])
  }
  const changeStatus = (id: string, isDone: boolean) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone } : t))
  }

  let tasksForTodoList = tasks

  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }

  return (
    <div className="App">
      <TodoList title={"What to learn"}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        addTask={addTask}
        changeStatus={changeStatus}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;