export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status }
        case 'APP/SET_ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export type AppActionsType = SetStatusActionType | SetErrorActionType
type SetStatusActionType = ReturnType<typeof setAppStatusAC>
type SetErrorActionType = ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET_STATUS" as const, status })
export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET_ERROR" as const, error })