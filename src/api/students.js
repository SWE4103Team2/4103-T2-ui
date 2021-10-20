import api from './api';

export const getStudents = async (file, id) => {
  const result = await api.get('/students/getStudents', {params: {id, file}});

  return result.data;
};

export const getFileNames = async () => {
  const result = await api.get('/students/getFiles');

  return result.data;
};