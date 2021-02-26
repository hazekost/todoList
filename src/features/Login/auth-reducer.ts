import {authAPI, LoginParamsType} from "../../api/todoLists-API";
import {Dispatch} from "redux";
import {ErrorUtilsDispatchType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: "login/SET-IS-LOGGED-IN",
        value
    } as const
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<setIsLoggedInActionType|ErrorUtilsDispatchType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}
export const LogoutTC = () => (dispatch: Dispatch<setIsLoggedInActionType|ErrorUtilsDispatchType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}

//Types
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionType = setIsLoggedInActionType