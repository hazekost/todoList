import { KeyboardEvent, ChangeEvent, useState } from "react"
import { FilterValuesType } from "./App"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: TodoListPropsType) {

    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title)
            setTitle("")
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
            <div><input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} /><button onClick={addTask}>+</button></div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id)

                        return <li key={t.id}>
                            <input type={"checkbox"} checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}