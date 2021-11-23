import * as authSelectors from "./selectors"
import { Login } from "./Login"
import { asyncActions as authAsyncActions } from "./auth-reducer"

const authActions = {
    ...authAsyncActions
}

export {
    authSelectors,
    Login,
    authActions,
}