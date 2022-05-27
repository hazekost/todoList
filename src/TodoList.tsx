import { Delete } from '@mui/icons-material';
import { Button, ButtonGroup, Checkbox, IconButton } from '@mui/material';
import React from 'react';
import { ChangeEvent, useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterType } from "./App"
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    id: string
    removeTask: (tlId: string, taskId: string) => void
    changeFilter: (tlId: string, filter: FilterType) => void
    addTask: (tlId: string, title: string) => void
    changeTaskStatus: (tlId: string, taskId: string, status: boolean) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (todoId: string, title: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    console.log("todolist")

    const addTask = useCallback((title: string) => props.addTask(props.id, title), [props.addTask, props.id])
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(props.id, title), [props.changeTodoListTitle, props.id])
    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.changeFilter, props.id])

    let filteredTasks = props.tasks

    if (props.filter === "active") {
        filteredTasks = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        filteredTasks = props.tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodoListTitle} />
                <IconButton size="small" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {filteredTasks.map(t => <Task
                    key={t.id}
                    title={t.title}
                    isDone={t.isDone}
                    tlid={props.id}
                    taskid={t.id}
                    removeTask={props.removeTask}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus} />)}
            </div>
            <div>
                <ButtonGroup>
                    <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
                    <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
                    <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
})