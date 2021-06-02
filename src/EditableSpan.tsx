import { useState, KeyboardEvent } from "react";
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onBlurHandler = () => {
        if (title.trim() !== "") {
            props.changeTitle(title)
            setEditMode(false)
        }
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onBlurHandler()
        }
    }

    return editMode
        ? <TextField variant="outlined" onKeyPress={onKeyPress} value={title} onChange={(e) => setTitle(e.currentTarget.value)} autoFocus onBlur={onBlurHandler} />
        : <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
}