import { Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { EditableSpan } from "../../../../common/EditableSpan"
import { deleteTask, setTaskStatus, setTaskTitle } from "./tasks-reducer"
import { TaskStatuses } from "../../../../api/api"

type TaskPropsType = {
    tlid: string
    taskid: string
    status: TaskStatuses
    title: string
    disabled: boolean
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    const { tlid, taskid, status, title, disabled } = props
    const dispatch = useDispatch()

    const removeTask = useCallback(() => { dispatch(deleteTask({ tlid, taskid })) }, [dispatch, tlid, taskid])
    const changeStatus = useCallback(() => { dispatch(setTaskStatus(tlid, taskid, status === 0 ? 2 : 0)) }, [dispatch, tlid, taskid, status])
    const changeTaskTitle = useCallback((title: string) => { dispatch(setTaskTitle(tlid, taskid, title)) }, [dispatch, tlid, taskid])

    return <div className={status === 1 ? "is-done" : ""}>
        <Checkbox color={"primary"} checked={status === 0 ? false : true} onChange={changeStatus} disabled={disabled} />
        <EditableSpan title={title} setTitle={changeTaskTitle} disabled={disabled} />
        <IconButton onClick={removeTask} disabled={disabled}>
            <Delete />
        </IconButton>
    </div>
})