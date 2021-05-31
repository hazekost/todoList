import { TodoList } from "./TodoList"
import './App.css';

function App() {

  const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "i am happy", isDone: false },
    { id: 3, title: "YO", isDone: false },
  ]

  return (
    <div className="App">
      <TodoList title={"What to learn"} tasks={tasks1} />
      <TodoList title={"Songs"} tasks={tasks2} />
    </div>
  );
}

export default App;