import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { AddBox } from '@mui/icons-material'

type CustomInputPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<CustomInputPropsType> = (props) => {

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
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error !== null) {
            setError(null)
        }
    }

    return <div>
        <TextField value={title} size="small" label="Title" helperText={error} error={!!error}
            onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
        <IconButton color="primary" size="medium" onClick={addTask}>
            <AddBox />
        </IconButton>
    </div>
}