import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FECTH_USERS_SUCCESS,
  FECTH_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  users: [],
  user: {},
  session: {},
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_USERS_SUCCESS:
      return {
        ...state,
        users: payload.data,
      };

    case FECTH_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case CREATE_USER_SUCCESS:
      return { ...state, users: [payload, ...state.users] };

    case CREATE_USER_FAIL:
      return {
        ...state,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        users: state.users.map((user) => (user._id === payload._id ? (user = payload) : user)),
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
