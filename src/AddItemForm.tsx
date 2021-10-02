import { ChangeEvent, useState, KeyboardEvent } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
        } else {
            setError("Title is requared")
        }
        if (title !== "") {
            setTitle("")
        }
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return <div>
        <input value={title}
            onKeyPress={addTaskOnKeyPress}
            onChange={onChangeInput}
            className={error ? "error" : ""} />
        <button onClick={addItem}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}