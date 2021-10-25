import api from './api';

export const uploadFilesAPI = async (fileName, files) => {
  const result = await api.post('/upload', { params: { fileName, files }});

  return result.data;
};
