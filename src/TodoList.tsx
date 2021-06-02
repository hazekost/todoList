import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { TaskType } from "./state/tasks-reducer";
import { FilterValuesType } from "./state/todoLists-reducer";

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
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={props.title} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.tlID)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.tlID)
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(title, props.tlID, t.id)
                        }

                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox color={"primary"} onChange={changeTaskStatus} checked={t.isDone} />
                            <EditableSpan changeTitle={changeTaskTitle} title={t.title} />
                            <IconButton onClick={removeTask}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={() => props.changeFilter(props.tlID, "all")}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={() => props.changeFilter(props.tlID, "active")}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={() => props.changeFilter(props.tlID, "completed")}>Completed</Button>
            </div>
        </div>
    )
}