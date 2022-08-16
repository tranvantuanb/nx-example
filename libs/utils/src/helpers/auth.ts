import jsCookie from 'js-cookie';
import { getCookie, removeCookies, setCookie } from 'cookies-next';
import {
  USER_ACCESS_TOKEN_KEY,
  USER_COUNTRY_CODE,
  WS_SHARED_ACCESS_TOKEN_KEY,
} from '../constants/auth';

export const getSharedCookieDomain = () => {
  const { hostname } = window.location;
  return hostname.indexOf('.') > 0
    ? hostname.slice(hostname.indexOf('.'))
    : hostname;
};

export const getWsSharedAccessToken = (): string | undefined => {
  return jsCookie.get(WS_SHARED_ACCESS_TOKEN_KEY);
};

export const setWsSharedAccessToken = (accessToken?: string) => {
  if (accessToken)
    jsCookie.set(WS_SHARED_ACCESS_TOKEN_KEY, accessToken, {
      domain: getSharedCookieDomain(),
      expires: 1,
    });
};

export const removeWsSharedAccessTokenCookie = () => {
  jsCookie.remove(WS_SHARED_ACCESS_TOKEN_KEY, {
    domain: getSharedCookieDomain(),
  });
};

export const getAccessToken = (): string | undefined => {
  return (
    localStorage.getItem(USER_ACCESS_TOKEN_KEY) || getWsSharedAccessToken()
  );
};

export const setAccessToken = (token?: string) => {
  if (!token) return;
  setWsSharedAccessToken(token);
  localStorage.setItem(USER_ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  removeWsSharedAccessTokenCookie();
  localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
};

export const setUserCountryCode = (countryCode?: string, options?: any) => {
  if (countryCode) setCookie(USER_COUNTRY_CODE, countryCode, options);
};

export const getUserCountryCode = (options?: any) => {
  return getCookie(USER_COUNTRY_CODE, options);
};

export const removeUserCountryCode = (options?: any) => {
  removeCookies(USER_COUNTRY_CODE, options);
};
