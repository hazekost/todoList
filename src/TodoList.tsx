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
    const { id, title, filter, changeTodoListTitle, removeTodoList, changeFilter } = props
    let dispatch = useDispatch()
    let tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.id])

    const removeTodoListHandler = useCallback(() => removeTodoList(id), [removeTodoList, id])
    const onAllClickHandler = useCallback(() => changeFilter(id, "all"), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter(id, "active"), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter(id, "completed"), [changeFilter, id])
    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.id, title)), [props.id, dispatch])
    const setTodoListTitle = useCallback((title: string) => changeTodoListTitle(id, title), [changeTodoListTitle, id])

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
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
                tasksForTodoList.map(t => <Task key={t.id} tlid={id} taskid={t.id} title={t.title} isDone={t.isDone} />)
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            <Button color={"default"} variant={filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
})
