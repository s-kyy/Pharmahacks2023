import {
  SET_MESSAGE,
  FECTH_FOODS_SUCCESS,
  FECTH_FOODS_FAIL,
  FECTH_FOOD_SUCCESS,
  FECTH_FOOD_FAIL,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAIL,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAIL,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
} from './types';

import * as FoodService from '../services/food.service';

export const getFoods = () => (dispatch) => {
  return FoodService.getFoods().then(
    (response) => {
      dispatch({
        type: FECTH_FOODS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.message) || error.message || error.toString();

      dispatch({
        type: FECTH_FOODS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getFood = (id) => (dispatch) => {
  return FoodService.getFood(id).then(
    (response) => {
      dispatch({
        type: FECTH_FOOD_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: FECTH_FOOD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createFood = (data) => (dispatch) => {
  return FoodService.createFood(data).then(
    (response) => {
      dispatch({
        type: CREATE_FOOD_SUCCESS,
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
        type: CREATE_FOOD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const updateFood = (id, data) => (dispatch) => {
  return FoodService.updateFood(id, data).then(
    (response) => {
      dispatch({
        type: UPDATE_FOOD_SUCCESS,
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
        type: UPDATE_FOOD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteFood = (id) => (dispatch) => {
  return FoodService.deleteFood(id).then(
    (response) => {
      dispatch({
        type: DELETE_FOOD_SUCCESS,
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
        type: DELETE_FOOD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
