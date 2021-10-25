import api from './api';

export const uploadFilesAPI = async (fileName, program, files) => {
  const result = await api.post('/upload', { params: { fileName, program, files }});

  return result.data;
};
