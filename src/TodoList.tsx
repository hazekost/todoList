import { EditableSpan } from "./EditableSpan";
import { AddItemForm } from "./AddItemForm";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "./store/store";
import { addTaskAC, TaskType } from "./store/tasks-reducer";
import { FilterType } from "./store/todoLists-reducer";
import React, { useCallback } from "react";
import { Task } from "./Task";

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

    let dispatch = useDispatch()
    let tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.id])

    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props])
    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props])
    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.id, title)), [props.id, dispatch])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(props.id, title), [props])

    let tasksForTodoList = tasks
    if (props.filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (props.filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} setTitle={changeTodoListTitle} />
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasksForTodoList.map(t => <Task key={t.id} tlid={props.id} taskid={t.id} title={t.title} isDone={t.isDone} />)
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            <Button color={"default"} variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
})
