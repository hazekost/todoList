import { EditableSpan } from "../../../common/EditableSpan";
import { AddItemForm } from "../../../common/AddItemForm";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../app/store";
import { createTaskTC, getTasksTC } from "./Task/tasks-reducer";
import { changeTodoListFilterAC, changeTodoTitleTC, deleteTodoTC, FilterType } from "./todoLists-reducer";
import React, { useCallback, useEffect } from "react";
import { Task } from "./Task/Task";
import { ItemType } from "../../../api/api";
import { RequestStatusType } from "../../../app/app-reducer";

type TodoListPropsType = {
    tlid: string
    title: string
    filter: FilterType
    disabled: boolean
}

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {
    console.log("todoList Called");
    const { tlid, title, filter, disabled } = props
    let dispatch = useDispatch()
    let tasks = useSelector<AppRootStateType, Array<ItemType & { entityStatus: RequestStatusType }>>(state => state.tasks[tlid])

    useEffect(() => {
        dispatch(getTasksTC(tlid))
    }, [dispatch, tlid])

    const addTask = useCallback((title: string) => dispatch(createTaskTC({ tlid, title })), [dispatch, tlid])
    const removeTodoListHandler = useCallback(() => { dispatch(deleteTodoTC(tlid)) }, [dispatch, tlid])
    const setTodoListTitle = useCallback((title: string) => { dispatch(changeTodoTitleTC({ tlid, title })) }, [dispatch, tlid])
    const onAllClickHandler = useCallback(() => { dispatch(changeTodoListFilterAC({ id: tlid, filter: "all" })) }, [dispatch, tlid])
    const onActiveClickHandler = useCallback(() => { dispatch(changeTodoListFilterAC({ id: tlid, filter: "active" })) }, [dispatch, tlid])
    const onCompletedClickHandler = useCallback(() => { dispatch(changeTodoListFilterAC({ id: tlid, filter: "completed" })) }, [dispatch, tlid])

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.status === 0)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status === 2)
    }

    return <div>
        <h3>
            <EditableSpan title={title} setTitle={setTodoListTitle} disabled={disabled} />
            <IconButton onClick={removeTodoListHandler} disabled={disabled}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={disabled} />
        <div>
            {
                tasksForTodoList.map(t => <Task key={t.id} tlid={tlid} taskid={t.id} title={t.title}
                    status={t.status} disabled={t.entityStatus === "loading"} />)
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            <Button color={"default"} variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
})
