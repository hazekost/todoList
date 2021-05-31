import { useState, ChangeEvent, KeyboardEvent } from "react"

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
            <input className={error && "error"} value={title} onKeyPress={onKeyPressHandler} onChange={onChangeHandler} />
            <button onClick={addItem}>+</button>
            {error ? <div className={"error-message"}>{error}</div> : ""}
        </div>
    )
}