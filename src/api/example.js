import api from './api';

export const example = async () => {
  const result = await api.get('/example/');

  return result.data;
};
