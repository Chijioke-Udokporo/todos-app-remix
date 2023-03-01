import axios from 'axios';
import { Response } from '@remix-run/node';

const endPoint = 'https://debtsy.burgeon8interactive.com/api/collections/todos/records';

const request = {
  get: async () => {
    const { data } = await axios.get(`${endPoint}`);
    return data;
  },

  post: async (query: any) => {
    const { data } = await axios.post(`${endPoint}`, query);
    return data;
  },

  patch: async (id: string, query: any) => {
    const { data } = await axios.patch(`${endPoint}/${id}`, query);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`${endPoint}/${id}`);
    return data;
  },
};

export default request;
