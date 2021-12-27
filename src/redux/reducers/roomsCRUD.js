import { Actions_Types } from "../actions/index";

const initialState = {
    rooms:[]
}

export const roomsCRUD = (state=initialState,action)=>{
    switch (action.type) {
        case Actions_Types.FETCH_ROOMS:
            return state.rooms = action.payload;
        case Actions_Types.DELETE_ROOM:
            return state;
        case Actions_Types.CREATE_ROOM:
            return state;
        default:
            return state;
    }
} 