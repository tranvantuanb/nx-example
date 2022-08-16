import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { CommonConstants, AuthConstants } from '../constants';
import { getAccessToken } from '../helpers/auth';
import { WS_SHARED_ACCESS_TOKEN_KEY } from '../constants/auth';

const isServer = typeof window === 'undefined';

interface IAxiosBaseQueryOptions {
  baseUrl?: string;
  accessTokenKey?: string;
  headers?: AxiosRequestConfig['headers'];
}

interface IHttp {
  get: (url: string, config?: AxiosRequestConfig) => AxiosRequestConfig;
  post: (url: string, config?: AxiosRequestConfig) => AxiosRequestConfig;
  delete: (url: string, config?: AxiosRequestConfig) => AxiosRequestConfig;
  put: (url: string, config?: AxiosRequestConfig) => AxiosRequestConfig;
}

/**
 * Get a custom axios instance which has Authorization header with access token
 * @param {string} [accessTokenKey] - name of the token in cookie
 * @param {string} [baseURL] - base url for the request
 * @returns {AxiosInstance} a custom axios instance
 */
export const getAxiosInstance = (
  baseURL = CommonConstants.API_URL_V1,
  accessTokenKey = AuthConstants.USER_ACCESS_TOKEN_KEY,
  headers
) => {
  const instance = axios.create({ baseURL });
  if (accessTokenKey) {
    let token;
    if (isServer) {
      token = Cookies.get(WS_SHARED_ACCESS_TOKEN_KEY);
    } else {
      token = getAccessToken();
    }

    if (token) {
      instance.interceptors.request.use((config) => {
        const instanceConfig = { ...config };

        if (headers)
          instanceConfig.headers = { ...instanceConfig.headers, ...headers };
        instanceConfig.headers.common.Authorization = `Bearer ${token}`;

        return instanceConfig;
      });
    }
  }

  return instance;
};

export const axiosBaseQuery =
  (
    options?: IAxiosBaseQueryOptions
  ): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const axios = getAxiosInstance(
        options?.baseUrl,
        options?.accessTokenKey,
        headers
      );

      const result = await axios({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const http: IHttp = {
  get: (url, config) => ({ method: 'GET', url, ...config }),
  post: (url, config) => ({ method: 'POST', url, ...config }),
  delete: (url, config) => ({ method: 'DELETE', url, ...config }),
  put: (url, config) => ({ method: 'PUT', url, ...config }),
};
