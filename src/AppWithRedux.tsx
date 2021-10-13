import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { AppStateType } from './store/store';
import { changeTodoListFilterAC, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, TodoListType, FilterType } from './store/todoLists-reducer';
import { TodoList } from './TodoList';

function AppWithRedux() {

    const dispatch = useDispatch()
    let todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists)

    const changeFilter = useCallback((id: string, filter: FilterType) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }, [dispatch])
    const removeTodoList = useCallback((id: string) => {
        dispatch(removeTodoListAC(id))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleAC(id, title))
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