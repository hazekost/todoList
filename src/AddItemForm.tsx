import { useState, ChangeEvent, KeyboardEvent } from "react";
import { TextField, IconButton } from '@material-ui/core';
import { AddBox } from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [error, setError] = useState("")
    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== "") {
            setError("")
        }
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField error={!!error} helperText={error} variant="outlined" label="Title" value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox />
            </IconButton>
        </div>
    )
}