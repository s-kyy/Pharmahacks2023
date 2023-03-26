import * as baseHttpService from './base-http.service';

export const getDiagnoses = () => {
  return baseHttpService.get('predictions');
};

export const getDiagnosis = (id) => {
  return baseHttpService.get(`predictions/${id}`);
};

export const createDiagnosis = async (data) => {
  return baseHttpService.post(`predictions`, data);
};

export const updateDiagnosis = async (id, data) => {
  return baseHttpService.put(`predictions/${id}`, data);
};

export const deleteDiagnosis = async (id) => {
  await baseHttpService._delete(`predictions/${id}`);
};
