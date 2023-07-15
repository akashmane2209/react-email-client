import axios, {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosRequestHeaders,
} from "axios";

const getHeaders = (
  headers: RawAxiosRequestHeaders
): RawAxiosRequestHeaders => {
  return {
    "Content-Type": "application/json",
    ...headers,
  };
};

axios.interceptors.request.use(
  function (config) {
    config.headers = getHeaders(config.headers) as AxiosRequestHeaders;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const engine = {
  get<T>(url: string, params?: AxiosRequestConfig) {
    return axios.get<T>(url, params).then(({ data }) => data);
  },

  post<T>(url: string, data: unknown, params: AxiosRequestConfig = {}) {
    return axios.post<T>(url, data, params).then(({ data }) => data);
  },
  put<T>(url: string, data: unknown, params: AxiosRequestConfig = {}) {
    return axios.put<T>(url, {
      ...params,
      data,
    });
  },
  delete<T>(url: string, data: unknown, params: AxiosRequestConfig = {}) {
    return axios.delete<T>(url, {
      ...params,
      data,
    });
  },
};

export default engine;
