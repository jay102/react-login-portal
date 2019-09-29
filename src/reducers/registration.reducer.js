import { userConstants } from '../constants';

const initialState = {
  registering: false,
}

export function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, registering: false }
    case userConstants.REGISTER_FAILURE:
      return { ...state, registering: false }
    default:
      return state
  }
}