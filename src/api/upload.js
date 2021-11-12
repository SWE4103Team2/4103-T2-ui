import api from './api';

// Uploads Files to Database
export const uploadFilesAPI = async (fileName, program, files) => {
  const form = new FormData();

  files.forEach(file => {
    form.append(file.name, file);
  });

  const result = await api.post('/upload/', form, { params: { fileName, program }});

  return result.data;
};
