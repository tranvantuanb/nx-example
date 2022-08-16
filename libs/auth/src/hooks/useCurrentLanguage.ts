import { useSelector } from 'react-redux';
import { selectors } from '../slice';

export const useCurrentLanguage = () => {
  return useSelector(selectors.currentUserSelectors.selectLanguage);
};
