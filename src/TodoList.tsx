import { KeyboardEvent, ChangeEvent, useState } from "react"
import { FilterValuesType } from "./App"
import './App.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    tlID: string
    removeTask: (taskID: string, tlID: string) => void
    removeTodoList: (tlID: string) => void
    changeFilter: (tlID: string, value: FilterValuesType) => void
    addTask: (title: string, tlID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, tlID: string) => void
}

export function TodoList(props: TodoListPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.tlID)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const removeTodoList = () => {
        props.removeTodoList(props.tlID)
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div><input className={error && "error"} value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} /><button onClick={addTask}>+</button></div>
            {error ? <div className={"error-message"}>{error}</div> : ""}
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.tlID)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.tlID)

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type={"checkbox"} onChange={changeTaskStatus} checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => props.changeFilter(props.tlID, "all")}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => props.changeFilter(props.tlID, "active")}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => props.changeFilter(props.tlID, "completed")}>Completed</button>
            </div>
        </div>
    )
}