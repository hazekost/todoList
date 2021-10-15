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

    const { tlid, taskid, isDone, title } = props
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(tlid, taskid))
    }, [dispatch, tlid, taskid])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(tlid, taskid, e.currentTarget.checked))
    }, [dispatch, tlid, taskid])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(tlid, taskid, title))
    }, [dispatch, tlid, taskid])

    return <div className={isDone ? "is-done" : ""}>
        <Checkbox color={"primary"} checked={isDone} onChange={changeStatus} />
        <EditableSpan title={title} setTitle={changeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
})