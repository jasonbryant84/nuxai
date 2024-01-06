import axios from 'axios';

export const getBlock = async <T>(workbookId: string): Promise<T> => {
  const response = await axios({
    method: 'GET',
    url: '/api/secureApi',
    params: { workbookId },
  });

  return response.data;
};
