import { useGetCurrentUserWSQuery } from '../slice';

export const useAuthCountryWS = () => {
  const currentUser = useGetCurrentUserWSQuery(undefined).data?.data;
  const countryCode = currentUser?.country?.country_code || 'SG';

  const isAuthorizedCountry = (ctries) =>
    !ctries || ctries.length === 0 || ctries.includes(countryCode);

  return {
    isAuthorizedCountry,
  };
};
