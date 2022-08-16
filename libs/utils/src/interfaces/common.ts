import React from 'react';

export interface ApiAlert {
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  type?: 'notification' | 'message';
}

export interface ApiRequest<T> {
  id?: number | string;
  data: T;
  successAlert?: ApiAlert | React.ReactNode;
  failureAlert?: ApiAlert | React.ReactNode;
}

export interface ApiResponse<T> {
  data: T;
  success?: {
    message: string;
  };
  error?: {
    message: string;
  };
}

export interface Pagination {
  count: number;
  current_page: number;
  links: {
    next?: string;
  };
  per_page: number;
  total: number;
  total_pages: number;
}

export interface PaginationResponse<T> extends ApiResponse<T> {
  meta: {
    pagination: Pagination;
  };
}

export interface PaginationRequest {
  page?: string;
  perPage?: string;
  keyword?: string;
  query?: string;
  queries?: string;
  sort?: string;
}

export enum CountryCode {
  SG = 'SG',
  MY = 'MY',
  TH = 'TH',
  ID = 'ID',
}
