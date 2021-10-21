import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import './App.css';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { RequestStatusType } from './app-reducer';
import { ErrorSnackbar } from '../common/ErrorSnackBar';

function App() {

    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
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
                {status === "loading" && <LinearProgress color="secondary" />}
            </AppBar>
            <TodoListsList />
        </div>
    );
}

export default App;