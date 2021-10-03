import { EditableSpan } from "./EditableSpan";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterType, TaskType } from "./App";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

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
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(props.id, t.id)
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked)
                    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.id, t.id, title)

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={"primary"} checked={t.isDone} onChange={changeStatus} />
                        <EditableSpan title={t.title} setTitle={changeTaskTitle} />
                        <IconButton onClick={removeTask}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{ marginTop: "5px" }}>
            <Button color={"default"} variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>;
}
