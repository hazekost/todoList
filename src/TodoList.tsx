import { useState, KeyboardEvent, ChangeEvent } from "react";
import { FilterType } from "./App";

type TasksType = {
    id: string
    isDone: boolean
    title: string
}
type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (task: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        if (title !== "") {
            setTitle("")
        }
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onKeyPress={addTaskOnKeyPress} onChange={onChangeInput} /><button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} />
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
    </div>;
}
