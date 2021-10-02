import { useState, FocusEvent, ChangeEvent } from "react"

type EditableSpanPropsType = {
    title: string
    setTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onDoubleClickHandler = () => setEdit(true)
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setEdit(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return edit
        ? <input value={title} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
        : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
}