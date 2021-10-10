import { EditableSpan } from "./EditableSpan";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "./store/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "./store/tasks-reducer";
import { FilterType } from "./store/todoLists-reducer";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterType
    changeFilter: (tlId: string, filter: FilterType) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    let dispatch = useDispatch()
    let tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.id])

    const removeTodoList = () => props.removeTodoList(props.id)
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const addTask = (title: string) => dispatch(addTaskAC(props.id, title))
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title)

    let tasksForTodoList = tasks
    if (props.filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (props.filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

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
                tasksForTodoList.map(t => {

                    const removeTask = () => dispatch(removeTaskAC(props.id, t.id))
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked))
                    const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(props.id, t.id, title))

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
