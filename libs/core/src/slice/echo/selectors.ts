import { createSelector } from '@reduxjs/toolkit';

const fromCoreEchoState = (state) => state.core.echo;

export const selectEchoCurrentStatus = createSelector(
  [fromCoreEchoState],
  (state) => state.status?.current
);
