import api from './api';

export const uploadFilesAPI = async (datasetName, programName, files) => {
  const result = await api.post('/upload/', { params: { datasetName, programName, files }});

  return result.data;
};
