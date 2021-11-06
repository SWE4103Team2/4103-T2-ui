import api from './api';

export const getUser = async (username, password) => {
  const result = await api.get('/login/', {params: {username, password}});

  return result.data;
};
