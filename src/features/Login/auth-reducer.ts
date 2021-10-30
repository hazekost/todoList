import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
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

export const loginTC = createAsyncThunk("auth/login", async (params: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
    try {
        const res = await authAPI.login(params)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
            return { isLoggedIn: true }
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return { isLoggedIn: false }
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return { isLoggedIn: false }
    }
})
// export const loginTC_ = (params: LoginParamsType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: "loading" }))
//     authAPI.login(params)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC({ status: "succeeded" }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
// }

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
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer
const { setIsLoggedInAC } = slice.actions

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

