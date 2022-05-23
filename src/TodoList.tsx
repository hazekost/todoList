import { Delete } from '@mui/icons-material';
import { Button, ButtonGroup, Checkbox, IconButton } from '@mui/material';
import { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterType } from "./App"
import { EditableSpan } from './EditableSpan';

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

export function TodoList(props: PropsType) {

    const addTask = (title: string) => props.addTask(props.id, title)
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title)
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

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
                {props.tasks.map(t => {

                    const removeTask = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, t.id, title)
                    }

                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox checked={t.isDone} onChange={onChangeHandler} />
                            <EditableSpan value={t.title} onChange={changeTaskTitle} />
                            <IconButton size="small" onClick={removeTask}>
                                <Delete />
                            </IconButton>
                        </div>
                    )
                })}
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
}