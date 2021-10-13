import api from './api';

export const getStudents = async () => {
  const result = await api.get('/students/', {params: {}});

  return result.data;
};

export const getStudent = async (id) => {
  const result = await api.get('/students/getStudent', {params: {id}});

  return result.data;
};

export const getFileNames = async () => {
  const result = await api.get('/students/getFiles', {params: {}});

  return result.data;
};