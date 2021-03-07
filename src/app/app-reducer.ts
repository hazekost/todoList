import {Dispatch} from "redux";
import {authAPI} from "../api/todoLists-API";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({value: true}))
        })
}
