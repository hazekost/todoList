import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import './App.css';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';

function App() {
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
            <TodoListsList />
        </div>
    );
}

export default App;