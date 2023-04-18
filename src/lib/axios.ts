import axios, { CreateAxiosDefaults } from "axios";

export const requestBuilder = (config?: CreateAxiosDefaults<any> | undefined) => {
  return axios.create({ ...config });
};
