import { IconButton, TextField } from "@material-ui/core";
import { AddBoxRounded } from "@material-ui/icons";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    disabled: boolean
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {

    let { addItem, disabled } = props
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
            onKeyPress={addTaskOnKeyPress} helperText={error} onChange={onChangeInput} disabled={disabled} />
        <IconButton style={{ marginLeft: "5px" }} color={"primary"} onClick={addItemHandler} disabled={disabled}>
            <AddBoxRounded />
        </IconButton>
    </div>
})