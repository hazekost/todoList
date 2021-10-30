import { Container, Grid, Paper } from "@material-ui/core"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddItemForm } from "../../common/AddItemForm"
import { AppRootStateType } from "../../app/store"
import { addTodo, getTodos, TodoListDomainType } from "./TodoList/todoLists-reducer"
import { TodoList } from "./TodoList/TodoList"
import { Redirect } from "react-router-dom"

export const TodoListsList = () => {

    const dispatch = useDispatch()
    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => { dispatch(addTodo(title)) }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <Container fixed >
        <Grid container style={{ padding: "10px" }}>
            <AddItemForm addItem={addTodoList} disabled={false} />
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map(tl => {
                return <Grid key={tl.id} item>
                    <Paper style={{ padding: "10px" }}>
                        <TodoList
                            tlid={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            disabled={tl.entityStatus === "loading"} />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </Container>
}