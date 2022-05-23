import React, { ChangeEvent } from 'react';
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
            <h3 style={{ display: "inline-block", marginRight: "5px" }}>
                <EditableSpan value={props.title} onChange={changeTodoListTitle} />
            </h3>
            <button onClick={removeTodoList}>X</button>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, t.id, title)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
                            <EditableSpan value={t.title} onChange={changeTaskTitle} />
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}