import api from './api';

export const getStudents = async (file, id) => {
  const result = await api.get('/students/getStudents', {params: {id, file}});
  return result.data;
};

export const getYear = async (file, id, type) => {
  const result = await api.get('/students/getYear', {params: {file, id, type}});
  return result.data;
};

export const getFileNames = async (type) => {
  const result = await api.get('/students/getFiles', {params: {type}});
  return result.data;
};

export const getFileTypes = async () => {
  const result = await api.get('/students/getFileTypes');
  return result.data;
};

export const getEnrollment = async (file, id) => {
  const result = await api.get('/students/getEnrollment', {params: {file, id}});
  return result.data;
};