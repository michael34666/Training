import axios, { type AxiosRequestConfig } from "axios";

const DEFAULT_TIMEOUT = 10000;

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: +(import.meta.env.VITE_API_TIMEOUT ?? DEFAULT_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};
