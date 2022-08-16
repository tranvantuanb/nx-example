import { useSelector } from 'react-redux';
import { selectors } from '../slice';

export const useCurrentCountry = () => {
  const countryCode = useSelector(
    selectors.currentUserSelectors.selectCountryCode
  );
  return countryCode;
};
