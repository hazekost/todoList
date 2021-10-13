import { Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import React, { ChangeEvent, useCallback } from "react"
import { useDispatch } from "react-redux"
import { EditableSpan } from "./EditableSpan"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./store/tasks-reducer"

type TaskPropsType = {
    tlid: string
    taskid: string
    isDone: boolean
    title: string
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.tlid, props.taskid))
    }, [dispatch, props.tlid, props.taskid])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.tlid, props.taskid, e.currentTarget.checked))
    }, [dispatch, props.tlid, props.taskid])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.tlid, props.taskid, title))
    }, [dispatch, props.tlid, props.taskid])

    return <div className={props.isDone ? "is-done" : ""}>
        <Checkbox color={"primary"} checked={props.isDone} onChange={changeStatus} />
        <EditableSpan title={props.title} setTitle={changeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
})