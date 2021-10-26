import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI, LoginParamsType } from "../../api/api"
import { setAppStatusAC, setAppInitializeAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"

// enum AUTH_TYPES {
//     SET_LOGIN = "Login/SET_LOGIN"
// }
// type AuthStateType = typeof initialState
// type AuthActionType = SetLoginActionType | AppActionsType

// export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
//     switch (action.type) {
//         case AUTH_TYPES.SET_LOGIN:
//             return { ...state, isLoggedIn: action.value }
//         default:
//             return state
//     }
// }
// type SetLoginActionType = ReturnType<typeof setIsLoggedInAC>
// const setIsLoggedInAC = (value: boolean) => ({ type: AUTH_TYPES.SET_LOGIN as const, value })

//with redux toolkit
const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const authReducer = slice.reducer
const { setIsLoggedInAC } = slice.actions

export const loginTC = (params: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    authAPI.login(params)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC({ status: "succeeded" }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
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
            dispatch(setAppInitializeAC({ value: true }))
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC({ status: 'succeeded' }))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

