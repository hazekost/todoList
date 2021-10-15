import { IconButton, TextField } from "@material-ui/core";
import { AddBoxRounded } from "@material-ui/icons";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {
    console.log("AddItemForm Called")
    let { addItem } = props
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        title.trim() !== "" ? addItem(title) : setError("Title is requared")
        title !== "" && setTitle("")
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null)
        e.key === "Enter" && addItemHandler()
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <TextField value={title} error={!!error} variant={"outlined"} label={"Title"}
            onKeyPress={addTaskOnKeyPress} helperText={error} onChange={onChangeInput} />
        <IconButton color={"primary"} onClick={addItemHandler}>
            <AddBoxRounded />
        </IconButton>
    </div>
})