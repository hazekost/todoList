import { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

export type FilterType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Rest API", isDone: false },
    { id: 5, title: "GraphQL", isDone: false }
  ])
  let [filter, setFilter] = useState<FilterType>("all")

  function removeTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function changeFilter(filter: FilterType) {
    setFilter(filter)
  }

  let tasksForTodoList = tasks

  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  }

  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;
