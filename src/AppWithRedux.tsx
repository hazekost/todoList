import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { AppRootStateType } from './store/store';
import { changeTodoListFilterAC, TodoListDomainType, FilterType, getTodo, deleteTodo, addTodo, changeTodoTitle } from './store/todoLists-reducer';
import { TodoList } from './TodoList';

function AppWithRedux() {

    const dispatch = useDispatch()
    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(getTodo())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeTodoList = useCallback((id: string) => {
        dispatch(deleteTodo(id))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodo(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoTitle(id, title))
    }, [dispatch])
    const changeFilter = useCallback((id: string, filter: FilterType) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }, [dispatch])

    return (
        <div className="AppWithReducers">
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Menu />
                    </IconButton>
                    <Button color="inherit">
                        <Typography variant="h6">
                            login
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid container style={{ padding: "10px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{ padding: "10px" }}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle} />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;