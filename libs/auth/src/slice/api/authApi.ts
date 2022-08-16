import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@carro/utils/api';

export enum AuthTags {
  Auth = 'Auth/Auth',
}

export const authApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  reducerPath: 'authApi',
  tagTypes: Object.values(AuthTags),
});
