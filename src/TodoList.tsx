import { useState, KeyboardEvent, ChangeEvent } from "react";
import { FilterType } from "./App";

type TasksType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    filter: FilterType
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    changeStatus: (id: string, status: boolean) => void
    addTask: (task: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
        } else {
            setError("Title is requared")
        }
        if (title !== "") {
            setTitle("")
        }
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                onKeyPress={addTaskOnKeyPress}
                onChange={onChangeInput}
                className={error ? "error" : ""} />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatus} />
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>;
}
