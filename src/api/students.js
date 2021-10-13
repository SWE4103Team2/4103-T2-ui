import api from './api';

export const getStudents = async (file) => {
  const result = await api.get('/students/', {params: {file}});

  return result.data;
};

export const getStudent = async (id, file) => {
  const result = await api.get('/students/getStudent', {params: {id, file}});

  return result.data;
};

export const getFileNames = async () => {
  const result = await api.get('/students/getFiles', {params: {}});

  return result.data;
};