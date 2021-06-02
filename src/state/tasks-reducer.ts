import { TasksType } from "../App";

type ActionType = {

}

export const userReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return { ...state, age: state.age + 1 };
        default:
            throw new Error("I don't understand this type")
    }
}