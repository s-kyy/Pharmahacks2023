import {
  FECTH_FOODS_SUCCESS,
  FECTH_FOODS_FAIL,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAIL,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAIL,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
  FECTH_FOOD_SUCCESS,
} from '../actions/types';

const initialState = {
  foods: [],
  food: {},
};

const foodReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_FOODS_SUCCESS:
      return {
        ...state,
        foods: payload.data,
      };

    case FECTH_FOOD_SUCCESS:
      return {
        ...state,
        food: payload,
      };

    case CREATE_FOOD_SUCCESS:
      return { ...state, foods: [payload, ...state.foods] };

    case CREATE_FOOD_FAIL:
      return {
        ...state,
      };

    case UPDATE_FOOD_SUCCESS:
      return {
        ...state,
        food: payload,
        foods: state.foods.map((food) => (food._id === payload._id ? (food = payload) : food)),
      };

    case UPDATE_FOOD_FAIL:
      return {
        ...state,
      };

    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        foods: state.foods.filter((food) => food._id !== payload),
      };

    case DELETE_FOOD_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default foodReducer;
