import userAuth from "./userAuth";
import {roomsCRUD} from './roomsCRUD';
import {msgsCRUD} from './msgsCRUD';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    userAuth,
    roomsCRUD,
    msgsCRUD
})

export default rootReducer;