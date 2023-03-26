import * as baseHttpService from './base-http.service';

export const getFoods = () => {
  return baseHttpService.get('foods/all');
};

export const getFood = (id) => {
  return baseHttpService.get(`foods/${id}`);
};

export const createFood = async (data) => {
  return baseHttpService.post(`foods`, data);
};

export const updateFood = async (id, data) => {
  return baseHttpService.put(`foods/${id}`, data);
};

export const deleteFood = async (id) => {
  await baseHttpService._delete(`foods/${id}`);
};
