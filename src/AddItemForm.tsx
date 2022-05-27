import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { AddBox } from '@mui/icons-material'
import React from "react"

type CustomInputPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<CustomInputPropsType> = React.memo((props) => {

    console.log("add item form")

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>
        <TextField value={title} size="small" label="Title" helperText={error} error={!!error}
            onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
        <IconButton color="primary" size="medium" onClick={addTask}>
            <AddBox />
        </IconButton>
    </div>
})