import {authAPI, LoginParamsType} from "../../api/todoLists-API";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false as boolean
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{value: boolean}>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}
export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(dispatch, response.data)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}