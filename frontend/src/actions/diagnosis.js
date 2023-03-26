import {
  SET_MESSAGE,
  FECTH_DIAGNOSES_SUCCESS,
  FECTH_DIAGNOSES_FAIL,
  FECTH_DIAGNOSIS_SUCCESS,
  FECTH_DIAGNOSIS_FAIL,
  CREATE_DIAGNOSIS_SUCCESS,
  CREATE_DIAGNOSIS_FAIL,
  UPDATE_DIAGNOSIS_SUCCESS,
  UPDATE_DIAGNOSIS_FAIL,
  DELETE_DIAGNOSIS_SUCCESS,
  DELETE_DIAGNOSIS_FAIL,
} from './types';

import * as DiagnosisService from '../services/diagnosis.service';

export const getDiagnoses = () => (dispatch) => {
  return DiagnosisService.getDiagnoses().then(
    (response) => {
      dispatch({
        type: FECTH_DIAGNOSES_SUCCESS,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.message) || error.message || error.toString();

      dispatch({
        type: FECTH_DIAGNOSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getDiagnosis = (id) => (dispatch) => {
  return DiagnosisService.getDiagnosis(id).then(
    (response) => {
      dispatch({
        type: FECTH_DIAGNOSIS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: FECTH_DIAGNOSIS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createDiagnosis = (data) => (dispatch) => {
  return DiagnosisService.createDiagnosis(data).then(
    (response) => {
      dispatch({
        type: CREATE_DIAGNOSIS_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve(response.data.message);
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: CREATE_DIAGNOSIS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const updateDiagnosis = (id, data) => (dispatch) => {
  return DiagnosisService.updateDiagnosis(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_DIAGNOSIS_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: UPDATE_DIAGNOSIS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteDiagnosis = (id) => (dispatch) => {
  return DiagnosisService.deleteDiagnosis(id).then(
    (response) => {
      dispatch({
        type: DELETE_DIAGNOSIS_SUCCESS,
        payload: id,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: DELETE_DIAGNOSIS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
