import { KeyboardEvent, ChangeEvent, useState } from "react"
import { FilterValuesType } from "./App"
import './App.css';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
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
            props.addTask(title)
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div><input className={error && "error"} value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} /><button onClick={addTask}>+</button></div>
            {error ? <div className={"error-message"}>{error}</div> : ""}
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type={"checkbox"} onChange={changeTaskStatus} checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => props.changeFilter("all")}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={() => props.changeFilter("active")}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}