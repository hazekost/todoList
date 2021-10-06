import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TodoList } from './TodoList';

export type FilterType = "all" | "completed" | "active"
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [key: string]: Array<TaskType>
}
type TodoListType = {
  id: string
  title: string
  filter: FilterType
}

function App() {

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" }
  ])
  let [tasks, setTasks] = useState<TasksType>({
    [todoListId1]: [
      { id: v1(), title: "HTML & CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false }
    ]
  })

  function removeTask(tlId: string, id: string) {
    setTasks({ ...tasks, [tlId]: tasks[tlId].filter(t => t.id !== id) })
  }
  function addTask(tlId: string, title: string) {
    setTasks({ ...tasks, [tlId]: [...tasks[tlId], { id: v1(), title, isDone: false }] })
  }
  function changeStatus(tlId: string, id: string, isDone: boolean) {
    setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? { ...t, isDone } : t) })
  }
  function changeTaskTitle(tlId: string, taskId: string, title: string) {
    setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === taskId ? { ...t, title } : t) })
  }
  function changeFilter(tlID: string, filter: FilterType) {
    setTodoLists(todoLists.map(tl => tl.id === tlID ? { ...tl, filter } : tl))
  }
  function removeTodoList(id: string) {
    delete tasks[id]
    setTodoLists(todoLists.filter(tl => tl.id !== id))
  }
  function addTodoList(title: string) {
    const id = v1()
    setTodoLists([{ id, title, filter: "all" }, ...todoLists])
    setTasks({ ...tasks, [id]: [] })
  }
  function changeTodoListTitle(id: string, title: string) {
    setTodoLists(todoLists.map(tl => tl.id === id ? { ...tl, title } : tl))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant="h6">
            LogOut
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed >
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map(tl => {

            let tasksForTodoList = tasks[tl.id]
            if (tl.filter === "active") {
              tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
            } else if (tl.filter === "completed") {
              tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
            }

            return <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <TodoList
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  filter={tl.filter}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  changeStatus={changeStatus}
                  removeTodoList={removeTodoList}
                  changeTodoListTitle={changeTodoListTitle}
                  changeTaskTitle={changeTaskTitle}
                  addTask={addTask} />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
