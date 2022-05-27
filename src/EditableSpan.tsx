import { TextField } from "@mui/material"
import React from "react"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

    console.log("editable span")

    let [editMode, setEditMode] = useState<boolean>(false)
    let [value, setValue] = useState("")

    const activateEditeMode = () => {
        setValue(props.value)
        setEditMode(true)
    }
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const activateViewMode = () => {
        props.onChange(value)
        setEditMode(false)
    }

    return editMode ?
        <TextField autoFocus value={value} onChange={changeHandler} onBlur={activateViewMode} /> :
        <span onDoubleClick={activateEditeMode}>{props.value}</span>
})