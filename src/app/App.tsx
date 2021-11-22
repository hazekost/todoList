import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import './App.css';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorSnackbar } from '../common/ErrorSnackBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../features/Auth/Login';
import { useEffect } from 'react';
import { initializeAppTC, logoutTC } from '../features/Auth/auth-reducer';
import { authSelectors } from '../features/Auth';
import { selectIsInitialized, selectStatus } from './selectors';

function App() {

    const dispatch = useDispatch()
    let status = useSelector(selectStatus)
    let isInitialized = useSelector(selectIsInitialized)
    let isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const onLogOutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        news
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onLogOutHandler}>log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary" />}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodoListsList />} />
                    <Route path={'/login'} render={() => <Login />} />
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>} />
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;