import { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material'

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
    const removeTodoList = (id: string) => {
        delete tasks[id]
        setTodoLists(todoLists.filter(tl => tl.id !== id))
    }
    const addTodoList = (title: string) => {
        const todoId = v1()
        setTodoLists([{ id: todoId, title, filter: "all" }, ...todoLists])
        setTasks({ ...tasks, [todoId]: [] })
    }
    const changeTodoListTitle = (id: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === id ? { ...tl, title } : tl))
    }
    const changeFilter = (id: string, filter: FilterType) => {
        setTodoLists(todoLists.map(tl => tl.id === id ? { ...tl, filter } : tl))
    }

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
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasks({ ...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? { ...t, title } : t) })
    }
    const changeTaskStatus = (tlId: string, taskId: string, status: boolean) => {
        setTasks({ ...tasks, [tlId]: tasks[tlId].map(t => t.id === taskId ? { ...t, isDone: status } : t) })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        let tasksForTodoList = tasks[tl.id]

                        if (tl.filter === "active") {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                        }

                        return <Grid item>
                            <Paper style={{ padding: "10px" }}>
                                <TodoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    filter={tl.filter}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;