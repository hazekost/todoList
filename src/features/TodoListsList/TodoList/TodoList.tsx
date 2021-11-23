import { EditableSpan } from "../../../common/EditableSpan";
import { AddItemForm } from "../../../common/AddItemForm";
import { Button, IconButton, PropTypes } from "@material-ui/core";
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
    const onFilterButtonClickHandler = (filter: FilterType) => changeTodoListFilterAC({ id: tlid, filter })

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.status === 0)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.status === 2)
    }

    const renderFilterButton = (buttonFilter: FilterType, color: PropTypes.Color, text: string) => {
        return <Button color={color} variant={filter === buttonFilter ? "contained" : "outlined"}
            onClick={() => onFilterButtonClickHandler(buttonFilter)}>{text}
        </Button>
    }

    return <div style={{ position: "relative" }}>
        <IconButton style={{ position: "absolute", right: "-15px", top: "-35px" }} onClick={removeTodoList} disabled={disabled}>
            <Delete />
        </IconButton>
        <h3>
            <EditableSpan title={title} setTitle={setTodoListTitle} disabled={disabled} />
        </h3>
        <AddItemForm addItem={addTask} disabled={disabled} />
        <div>
            {
                tasksForTodoList.length !== 0
                    ? tasksForTodoList.map(t => <Task key={t.id} tlid={tlid} taskid={t.id} title={t.title}
                        status={t.status} disabled={t.entityStatus === "loading"} />)
                    : <div style={{ padding: "5px", color: "grey" }}>No Tasks</div>
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            {renderFilterButton("all", "default", "All")}
            {renderFilterButton("active", "primary", "Active")}
            {renderFilterButton("completed", "secondary", "Completed")}
        </div>
    </div>;
})
