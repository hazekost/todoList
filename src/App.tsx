import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './TodoList';

export type FilterType = "all" | "completed" | "active"

function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML & CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false }
  ])
  let [filter, setFilter] = useState<FilterType>("all")

  function removeTask(id: string) {
    setTasks(tasks.filter(t => t.id !== id))
  }
  function changeFilter(filter: FilterType) {
    setFilter(filter)
  }
  function addTask(title: string) {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks])
  }
  function changeStatus(id: string, status: boolean) {
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = status
      setTasks([...tasks])
    }
  }

  let tasksForTodoList = tasks

  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  } else if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }

  return (
    <div className="App">
      <TodoList title="What to learn"
        tasks={tasksForTodoList}
        filter={filter}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeStatus={changeStatus}
        addTask={addTask} />
    </div>
  );
}

export default App;
