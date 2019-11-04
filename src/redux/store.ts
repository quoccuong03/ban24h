import {createStore, combineReducers} from "redux";
import {UserReducers, UserState} from "./user/UserReducers";

export interface IReduxState {
    userState: UserState
}

let reducer = combineReducers<IReduxState>({
    userState: UserReducers
});


export default createStore(reducer);
