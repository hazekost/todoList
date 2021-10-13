import { TextField } from "@material-ui/core"
import React from "react"
import { useState, FocusEvent, ChangeEvent } from "react"

type EditableSpanPropsType = {
    title: string
    setTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
    console.log("EditableSpan called")
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState("")

    const onDoubleClickHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
        setEdit(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return edit
        ? <TextField variant={"outlined"} value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
})