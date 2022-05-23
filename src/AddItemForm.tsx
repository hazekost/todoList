import React from "react"
import { ChangeEvent, useState, KeyboardEvent } from "react"

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
        <input className={error ? "error" : ""} value={title} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}