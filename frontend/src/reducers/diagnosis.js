import {
  FECTH_DIAGNOSES_SUCCESS,
  FECTH_DIAGNOSES_FAIL,
  CREATE_DIAGNOSIS_SUCCESS,
  CREATE_DIAGNOSIS_FAIL,
  UPDATE_DIAGNOSIS_SUCCESS,
  UPDATE_DIAGNOSIS_FAIL,
  DELETE_DIAGNOSIS_SUCCESS,
  DELETE_DIAGNOSIS_FAIL,
  FECTH_DIAGNOSIS_SUCCESS,
} from '../actions/types';

const initialState = {
  diagnoses: [],
  diagnosis: {},
};

const diagnosisReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FECTH_DIAGNOSES_SUCCESS:
      return {
        ...state,
        diagnoses: payload.data,
      };

    case FECTH_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        diagnosis: payload,
      };

    case CREATE_DIAGNOSIS_SUCCESS:
      return { ...state, diagnoses: [payload, ...state.diagnoses] };

    case CREATE_DIAGNOSIS_FAIL:
      return {
        ...state,
      };

    case UPDATE_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        diagnosis: payload,
        diagnoses: state.diagnoses.map((diagnosis) => (diagnosis._id === payload._id ? (diagnosis = payload) : diagnosis)),
      };

    case UPDATE_DIAGNOSIS_FAIL:
      return {
        ...state,
      };

    case DELETE_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        diagnoses: state.diagnoses.filter((diagnosis) => diagnosis._id !== payload),
      };

    case DELETE_DIAGNOSIS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default diagnosisReducer;
