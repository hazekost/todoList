import { TodoList } from "./TodoList"
import './App.css';
import { useState } from "react";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

  let [filter, setFilter] = useState<FilterValuesType>("all")
  let [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "RestApi", isDone: false },
    { id: 5, title: "GraphQL", isDone: false },
  ])

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
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
      <TodoList title={"What to learn"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;