import { Actions_Types } from "../actions/index";

const initialState={
    msgs:[]
}

export const msgsCRUD = (state=initialState,action)=>{
    switch(action.type){
        case Actions_Types.FETCH_MESSAGES:
            return state.msgs = action.payload;
        case Actions_Types.ADD_MESSAGE:
            return state;
        case Actions_Types.DELETE_MESSAGES:
            return state;
        default:
            return state;
    }
}