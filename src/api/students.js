import api from './api';

export const getStudents = async () => {
  const result = await api.get('/students/');

  return result.data;
};
