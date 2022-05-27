import { Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import React, { useCallback } from "react"
import { ChangeEvent } from "react"
import { EditableSpan } from "./EditableSpan"

type TaskPropsType = {
    tlid: string
    taskid: string
    isDone: boolean
    title: string
    removeTask: (tlid: string, taskid: string) => void
    changeTaskStatus: (tlid: string, taskid: string, isDone: boolean) => void
    changeTaskTitle: (tlid: string, taskid: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const removeTask = useCallback(() => props.removeTask(props.tlid, props.taskid), [props.removeTask, props.tlid, props.taskid])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.tlid, props.taskid, e.currentTarget.checked)
    }, [props.changeTaskStatus, props.tlid, props.taskid])
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.tlid, props.taskid, title)
    }, [props.changeTaskTitle, props.tlid, props.taskid])

    return (
        <div className={props.isDone ? "is-done" : ""}>
            <Checkbox checked={props.isDone} onChange={onChangeHandler} />
            <EditableSpan value={props.title} onChange={changeTaskTitle} />
            <IconButton size="small" onClick={removeTask}>
                <Delete />
            </IconButton>
        </div>
    )
})