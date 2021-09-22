import api from './api';

export const example = async (bc, tc) => {
  const result = await api.get('/example/'+ bc.toString() + '-' + tc.toString());

  return result.data;
};
