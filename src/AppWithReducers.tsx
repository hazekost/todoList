import { useReducer } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material'
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todoListsReducer } from './state/todolists-reducer';
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './state/tasks-reducer';

export type FilterType = "all" | "active" | "completed"
// type TodoListType = {
//     id: string
//     title: string
//     filter: FilterType
// }
// type TasksType = {
//     [key: string]: Array<TaskType>
// }

export function AppWithReducers() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        { id: todoListId1, title: "What to Learn", filter: "all" },
        { id: todoListId2, title: "What to Buy", filter: "all" },
    ])
    const removeTodoList = (id: string) => {
        delete tasks[id]
        const action = removeTodoListAC(id)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchTasks(action)
        dispatchTodoLists(action)
    }
    const changeTodoListTitle = (id: string, title: string) => {
        dispatchTodoLists(changeTodoListTitleAC(id, title))
    }
    const changeFilter = (id: string, filter: FilterType) => {
        dispatchTodoLists(changeTodoListFilterAC(id, filter))
    }

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    const removeTask = (tlId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(tlId, taskId))
    }
    const addTask = (tlId: string, title: string) => {
        dispatchTasks(addTaskAC(tlId, title))
    }
    const changeTaskTitle = (tlId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAC(tlId, taskId, title))
    }
    const changeTaskStatus = (tlId: string, taskId: string, status: boolean) => {
        dispatchTasks(changeTaskStatusAC(tlId, taskId, status))
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