import React from "react"
import { Container, Grid, Paper } from "@material-ui/core"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AddItemForm } from "../../common/AddItemForm"
import { AppRootStateType, useActions } from "../../app/store"
import { TodoListDomainType } from "./TodoList/todoLists-reducer"
import { TodoList } from "./TodoList/TodoList"
import { Redirect } from "react-router-dom"
import { selectIsLoggedIn } from "../Auth/selectors"
import { todoListsActions } from "."

export const TodoListsList = React.memo(() => {

    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    let isLoggedIn = useSelector(selectIsLoggedIn)
    const { getTodosTC, addTodoTC } = useActions(todoListsActions)

    useEffect(() => {
        getTodosTC()
    }, [getTodosTC])

    if (!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <Container fixed >
        <Grid container style={{ padding: "10px" }}>
            <AddItemForm addItem={addTodoTC} disabled={false} />
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
})