import { Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import React from "react"
import { tasksActions } from "../.."
import { TaskStatuses } from "../../../../api/api"
import { useActions } from "../../../../app/store"
import { EditableSpan } from "../../../../common/EditableSpan"

type TaskPropsType = {
    tlid: string
    taskid: string
    status: TaskStatuses
    title: string
    disabled: boolean
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {

    const { tlid, taskid, status, title, disabled } = props
    const { deleteTaskTC, updateTaskTC } = useActions(tasksActions)

    const removeTask = () => deleteTaskTC({ tlid, taskid })
    const changeStatus = () => updateTaskTC({ tlid, taskid, model: { status: status === 0 ? 2 : 0 } })
    const changeTaskTitle = (title: string) => updateTaskTC({ tlid, taskid, model: { title } })

    return <div className={status === 1 ? "is-done" : ""}>
        <Checkbox color={"primary"} checked={status === 0 ? false : true} onChange={changeStatus} disabled={disabled} />
        <EditableSpan title={title} setTitle={changeTaskTitle} disabled={disabled} />
        <IconButton onClick={removeTask} disabled={disabled}>
            <Delete />
        </IconButton>
    </div>
})