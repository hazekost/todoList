import { TextField } from "@material-ui/core"
import React from "react"
import { useState, FocusEvent, ChangeEvent } from "react"

type EditableSpanPropsType = {
    title: string
    disabled: boolean
    setTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
    console.log("EditableSpan called")
    let { title, setTitle, disabled } = props
    let [editMode, setEditMode] = useState(false)
    let [value, setValue] = useState("")

    const onDoubleClickHandler = () => {
        if (!disabled) {
            setEditMode(true)
            setValue(title)
        }
    }
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    return editMode
        ? <TextField variant={"outlined"} value={value} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
})