import axios, { AxiosInstance } from "axios";

const axiosParams = {
  baseURL: "http://localhost:8080/api",
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config = {}) => axios.get(url, config),
    post: (url: string, body: Object | undefined, config = {}) =>
      axios.post(url, body, config),
    put: (url: string, body: Object | undefined, config = {}) =>
      axios.put(url, body, config),
    delete: (url: string, config = {}) => axios.delete(url, config),
  };
};

export default api(axiosInstance);
