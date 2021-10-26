import api from './api';

export const getStudents = async (srcVal, file) => {
  const result = await api.get('/students/getStudents', {params: {srcVal, file}});
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