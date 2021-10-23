import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from "../../api/api"
import { setAppStatusAC, AppActionsType, setAppInitializeAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"

enum AUTH_TYPES {
    SET_LOGIN = "Login/SET_LOGIN"
}
type AuthStateType = typeof initialAuthState
type AuthActionType = SetLoginActionType | AppActionsType

const initialAuthState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialAuthState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case AUTH_TYPES.SET_LOGIN:
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}

type SetLoginActionType = ReturnType<typeof setIsLoggedInAC>

const setIsLoggedInAC = (value: boolean) => ({ type: AUTH_TYPES.SET_LOGIN as const, value })

export const loginTC = (params: LoginParamsType) => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(params)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch<AuthActionType>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializeAC(true))
        })
}
export const logoutTC = () => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

