import {setAppErrorAC, setAppStatusAC,} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todoLists-API";


export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Some Error occurred"}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetworkError = (dispatch: Dispatch, error: {message: string}) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: "failed"}))
}