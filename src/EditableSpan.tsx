import React, { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

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
        <input autoFocus value={value} onChange={changeHandler} onBlur={activateViewMode} /> :
        <span onDoubleClick={activateEditeMode}>{props.value}</span>
}