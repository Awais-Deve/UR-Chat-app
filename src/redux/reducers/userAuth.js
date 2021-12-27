import { Actions_Types } from "../actions/index";


const initialState = {
  user: null,
};

const userAuth = (state = initialState, action) => {
  switch (action.type) {
    case Actions_Types.SIGN_IN:
      return {...state , user: action.payload}
    case Actions_Types.SING_OUT:
      return {...state , user:action.payload}
    default:
      return state;
  }
};

export default userAuth;
