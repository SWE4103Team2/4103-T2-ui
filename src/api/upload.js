import api from './api';

export const uploadStudents = async (fileName, file) => {
  const form = new FormData();
  form.append('file', file);
  const result = await api.post('/upload/students', form, { params: { fileName }});

  return result.data;
};
