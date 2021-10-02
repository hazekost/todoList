import { EditableSpan } from "./EditableSpan";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
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
    changeTaskTitle: (tlId: string, taskId: string, title: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const removeTodoList = () => props.removeTodoList(props.id)
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const addTask = (title: string) => props.addTask(props.id, title)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title)

    return <div>
        <h3>
            <EditableSpan title={props.title} setTitle={changeTodoListTitle} />
            <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(props.id, t.id)
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, t.id, title)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatus} />
                        <EditableSpan title={t.title} setTitle={changeTaskTitle} />
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
