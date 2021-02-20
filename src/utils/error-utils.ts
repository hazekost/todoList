import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todoLists-API";

type ErrorUtilsDispatchType = setAppErrorActionType|setAppStatusActionType

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some Error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: {message: string}) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}