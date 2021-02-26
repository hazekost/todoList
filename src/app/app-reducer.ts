import {Dispatch} from "redux";
import {authAPI} from "../api/todoLists-API";
import {setIsLoggedInAC, setIsLoggedInActionType} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string|null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string|null) => ({type: "APP/SET-ERROR", error} as const)
const setIsInitializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALIZED", value} as const)


export const initializeAppTC = () => (dispatch: Dispatch<setIsLoggedInActionType|ErrorUtilsDispatchType|setIsInitializedActionType>) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

//Type
type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
type ActionType = setAppErrorActionType|setAppStatusActionType|setIsInitializedActionType
type InitialStateType = typeof initialState

export type ErrorUtilsDispatchType = setAppStatusActionType| setAppErrorActionType
