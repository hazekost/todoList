import { RequestStatusType } from "./app-reducer"
import { AppRootStateType } from "./store"

export const selectStatus = (state: AppRootStateType): RequestStatusType => state.app.status
export const selectIsInitialized = (state: AppRootStateType): boolean => state.app.isInitialized