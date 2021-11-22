import { EditableSpan } from "../../../common/EditableSpan";
import { AddItemForm } from "../../../common/AddItemForm";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { AppRootStateType, useActions } from "../../../app/store";
import { FilterType } from "./todoLists-reducer";
import React, { useCallback, useEffect } from "react";
import { Task } from "./Task/Task";
import { ItemType } from "../../../api/api";
import { RequestStatusType } from "../../../app/app-reducer";
import { tasksActions } from "..";
import { todoListsActions } from "..";

type TodoListPropsType = {
    tlid: string
    title: string
    filter: FilterType
    disabled: boolean
}

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

    const { tlid, title, filter, disabled } = props
    let tasks = useSelector<AppRootStateType, Array<ItemType & { entityStatus: RequestStatusType }>>(state => state.tasks[tlid])
    const { createTaskTC, getTasksTC } = useActions(tasksActions)
    const { deleteTodoTC, changeTodoTitleTC, changeTodoListFilterAC } = useActions(todoListsActions)

    useEffect(() => {
        getTasksTC(tlid)
    }, [getTasksTC, tlid])

    const addTask = useCallback((title: string) => createTaskTC({ tlid, title }), [createTaskTC, tlid])
    const removeTodoList = () => deleteTodoTC(tlid)
    const setTodoListTitle = (title: string) => changeTodoTitleTC({ tlid, title })
    const onAllClickHandler = () => changeTodoListFilterAC({ id: tlid, filter: "all" })
    const onActiveClickHandler = () => changeTodoListFilterAC({ id: tlid, filter: "active" })
    const onCompletedClickHandler = () => changeTodoListFilterAC({ id: tlid, filter: "completed" })

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.status === 0)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status === 2)
    }

    return <div>
        <h3>
            <EditableSpan title={title} setTitle={setTodoListTitle} disabled={disabled} />
            <IconButton onClick={removeTodoList} disabled={disabled}>
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
            <Button color={"default"} variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>
                All
            </Button>
            <Button color={"primary"} variant={filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button color={"secondary"} variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>;
})
