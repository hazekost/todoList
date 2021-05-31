import { ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import './App.css';
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan";

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
    changeTodoListTitle: (title: string, tlID: string) => void
    changeTaskTitle: (title: string, tlID: string, taskID: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.tlID)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.tlID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.tlID)
    }

    return (
        <div>
            <h3><EditableSpan changeTitle={changeTodoListTitle} title={props.title} /><button onClick={removeTodoList}>x</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.tlID)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.tlID)
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(title, props.tlID, t.id)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type={"checkbox"} onChange={changeTaskStatus} checked={t.isDone} />
                            <EditableSpan changeTitle={changeTaskTitle} title={t.title} />
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