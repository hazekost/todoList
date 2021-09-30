import { useState, KeyboardEvent, ChangeEvent } from "react";
import { FilterType, TaskType } from "./App";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    changeFilter: (tlId: string, filter: FilterType) => void
    changeStatus: (tlId: string, id: string, status: boolean) => void
    addTask: (tlId: string, task: string) => void
    removeTodoList: (id: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.id, title)
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
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    return <div>
        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
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

                    const removeTask = () => props.removeTask(props.id, t.id)
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatus} />
                        <span>{t.title} </span>
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
