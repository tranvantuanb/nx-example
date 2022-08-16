import { createSelector } from '@reduxjs/toolkit';

import { getCurrentUserWS } from '../api';

const selectState = getCurrentUserWS.select(undefined);

export const selectCurrentUser = createSelector(
  selectState,
  (state) => state.data?.data
);

export const selectCountryCode = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.country?.country_code
);

export const selectLanguage = createSelector(
  selectCurrentUser,
  (currentUser) => currentUser?.locale?.language
);
