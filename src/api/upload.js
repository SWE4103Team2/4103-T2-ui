import api from './api';

export const uploadFile = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const result = await api.post('/upload/', form);

  return result.data;
};
