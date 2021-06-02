import { TodoList } from "./TodoList"
import { AddItemForm } from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Button, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from '@material-ui/icons/';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterValuesType, removeTodoListAC, TodoListType } from "./state/todoLists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "./state/store";

function AppWithRedux() {

  const dispatch = useDispatch()
  let todoLists = useSelector<AppStoreType, Array<TodoListType>>(store => store.todoLists)
  let tasks = useSelector<AppStoreType, TasksType>(store => store.tasks)

  const removeTask = (taskID: string, tlID: string) => {
    dispatch(removeTaskAC(tlID, taskID))
  }
  const addTask = (title: string, tlID: string) => {
    dispatch(addTaskAC(tlID, title))
  }
  const changeTaskStatus = (taskID: string, isDone: boolean, tlID: string) => {
    dispatch(changeTaskStatusAC(tlID, taskID, isDone))
  }
  const changeTaskTitle = (title: string, tlID: string, taskID: string) => {
    dispatch(changeTaskTitleAC(tlID, taskID, title))
  }
  const removeTodoList = (tlID: string) => {
    dispatch(removeTodoListAC(tlID))
  }
  const changeFilter = (tlID: string, value: FilterValuesType) => {
    dispatch(changeTodoListFilterAC(tlID, value))
  }
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
  }
  const changeTodoListTitle = (title: string, tlID: string) => {
    dispatch(changeTodoListTitleAC(tlID, title))
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {
            todoLists.map(tl => {

              let tasksForTodoList = tasks[tl.id]

              if (tl.filter === "active") {
                tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
              }
              if (tl.filter === "completed") {
                tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
              }

              return (
                <Grid item key={tl.id}>
                  <Paper style={{ padding: "10px" }} >
                    <TodoList
                      tlID={tl.id}
                      title={tl.title}
                      tasks={tasksForTodoList}
                      filter={tl.filter}
                      changeTodoListTitle={changeTodoListTitle}
                      changeTaskTitle={changeTaskTitle}
                      removeTodoList={removeTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeFilter={changeFilter} />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;