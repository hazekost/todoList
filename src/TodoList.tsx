import { EditableSpan } from "./EditableSpan";
import { AddItemForm } from "./AddItemForm";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";
import { createTask, getTasks } from "./store/tasks-reducer";
import { FilterType } from "./store/todoLists-reducer";
import React, { useCallback, useEffect } from "react";
import { Task } from "./Task";
import { ItemType } from "./todo-api/api";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    changeFilter: (tlId: string, filter: FilterType) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {
    console.log("todoList Called");
    const { id, title, filter, changeTodoListTitle, removeTodoList, changeFilter } = props
    let dispatch = useDispatch()
    let tasks = useSelector<AppRootStateType, Array<ItemType>>(state => state.tasks[props.id])

    useEffect(() => {
        dispatch(getTasks(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeTodoListHandler = useCallback(() => removeTodoList(id), [removeTodoList, id])
    const onAllClickHandler = useCallback(() => changeFilter(id, "all"), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter(id, "active"), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter(id, "completed"), [changeFilter, id])
    const addTask = useCallback((title: string) => dispatch(createTask(id, title)), [dispatch, id])
    const setTodoListTitle = useCallback((title: string) => changeTodoListTitle(id, title), [changeTodoListTitle, id])

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.status === 0)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status === 2)
    }

    return <div>
        <h3>
            <EditableSpan title={title} setTitle={setTodoListTitle} />
            <IconButton onClick={removeTodoListHandler}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasksForTodoList.map(t => <Task key={t.id} tlid={id} taskid={t.id} title={t.title} status={t.status} />)
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            <Button color={"default"} variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
})
