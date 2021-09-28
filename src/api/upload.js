import api from './api';

export const uploadFile = async (file) => {
  const data = await file.text();
  const result = await api.put('/upload/', { data });

  return result.data;
};
