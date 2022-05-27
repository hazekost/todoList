import './App.css';
import { TodoList } from './TodoList';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material'
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, FilterType, removeTodoListAC, TodoListType } from './state/todolists-reducer';
import { removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC, TasksStateType } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useCallback } from 'react';

export function AppWithRedux() {

    // const todoListId1 = v1()
    // const todoListId2 = v1()

    // let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
    //     { id: todoListId1, title: "What to Learn", filter: "all" },
    //     { id: todoListId2, title: "What to Buy", filter: "all" },
    // ])

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todoListId1]: [
    //         { id: v1(), title: "HTML & CSS", isDone: true },
    //         { id: v1(), title: "JS", isDone: true },
    //         { id: v1(), title: "React JS", isDone: false },
    //         { id: v1(), title: "Rest API", isDone: false },
    //         { id: v1(), title: "Graph QL", isDone: false },
    //     ],
    //     [todoListId2]: [
    //         { id: v1(), title: "Bread", isDone: false },
    //         { id: v1(), title: "Milk", isDone: true },
    //         { id: v1(), title: "Beer", isDone: false },
    //         { id: v1(), title: "Cheese", isDone: true },
    //     ]
    // })

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTodoList = useCallback((id: string) => {
        delete tasks[id]
        dispatch(removeTodoListAC(id))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
    }, [dispatch])
    const changeFilter = useCallback((id: string, filter: FilterType) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }, [dispatch])
    const removeTask = useCallback((tlId: string, taskId: string) => {
        dispatch(removeTaskAC(tlId, taskId))
    }, [dispatch])
    const addTask = useCallback((tlId: string, title: string) => {
        dispatch(addTaskAC(tlId, title))
    }, [dispatch])
    const changeTaskTitle = useCallback((tlId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(tlId, taskId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((tlId: string, taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(tlId, taskId, status))
    }, [dispatch])

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

                        return <Grid item key={tl.id}>
                            <Paper style={{ padding: "10px" }}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
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