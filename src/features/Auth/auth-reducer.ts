import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { authAPI, FieldErrorType, LoginParamsType } from "../../api/api"
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

// export const _logoutTC = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({ status: 'loading' }))
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(false))
//                 dispatch(setAppStatusAC({ status: 'succeeded' }))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// export const _initializeAppTC = () => (dispatch: Dispatch) => {
//     authAPI.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true));
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch(err => {
//             handleServerNetworkError(err, dispatch)
//         })
//         .finally(() => {
//             dispatch(setAppInitializeAC({ value: true }))
//         })
// }

//with redux toolkit

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>("auth/login", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return;
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(err, dispatch)
        return rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            // dispatch(setIsLoggedInAC(false))
            return;
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const initializeAppTC = createAsyncThunk("auth/initializeApp", async (param, { dispatch, rejectWithValue }) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            // dispatch(setIsLoggedInAC(true));
            return;
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue({})
    } finally {
        dispatch(setAppInitializeAC({ value: true }))
    }
})

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        });
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
    }
})

export const authReducer = slice.reducer