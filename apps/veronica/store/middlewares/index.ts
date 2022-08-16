import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { JEST_WORKER_ID } from '@carro/utils/constants/core';

import { asyncActionMessages } from './asyncActionMessages';
import { error401 } from './error401';

const isServer = typeof window === 'undefined';
const isProd = process.env['APP_ENV'] === 'production';

export const middlewares = [thunk, asyncActionMessages, error401];

// enable logger in dev environment
if (!isProd && !isServer && !JEST_WORKER_ID) {
  const logger = createLogger({ collapsed: true });
  // NOTE: logger must be the last middleware in the chain
  middlewares.push(logger);
}
