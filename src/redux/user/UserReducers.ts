import {AnyAction} from "redux";
import {User} from "../../models/ObjsType";

export interface UserState {
    logged?: boolean
    user?: User
}

export function UserReducers(state: UserState = {user: undefined}, action: AnyAction): any {
    switch (action.type) {
        case UserActionConstants.LOGIN_SUCCESS:
            return {...state, logged: true, user: action.user};
        case UserActionConstants.LOGOUT_SUCCESS:
            return {...state, logged: false, user: null};
        default:
            return state;
    }
}

// region action ===========
export function loginSuccess(user: User): AnyAction {
    return {type: UserActionConstants.LOGIN_SUCCESS, user: user};
}

export function logoutSuccess(): AnyAction {
    return {type: UserActionConstants.LOGOUT_SUCCESS};
}

export const UserActionConstants = {
    LOGIN_SUCCESS: "LOGIN",
    LOGOUT_SUCCESS: "LOGOUT",
};

//endregion
