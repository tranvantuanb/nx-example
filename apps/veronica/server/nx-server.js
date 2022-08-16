// @ts-check
'use strict';

/**
 * @typedef {import('http').Server} Server
 * @typedef {import('next/dist/server/next-server').default} DevServer
 */
const express = require('express');
const path = require('path');
const serverHandler = require('./serverHandler');
/**
 * @param {DevServer} app
 * @param {{dev: string; dir: string; staticMarkup: boolean; quiet: boolean; conf: any; port: number;}} options
 * @returns {Promise<Server>}
 */
module.exports = async function nextServer(app, options) {
  const handle = app.getRequestHandler();
  const expressApp = express();
  await app.prepare();
  /**
   * @returns {Promise<Server>}
   */
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    expressApp.disable('x-powered-by');

    // Serve shared assets copied to `public` folder
    expressApp.use(
      express.static(path.resolve(options.dir, options.conf.outdir, 'public'))
    );

    serverHandler(app, expressApp);

    expressApp.all('*', (req, res) => {
      return handle(req, res);
    });
    const server = expressApp.listen(options.port, (err) => {
      err ? reject(err) : resolve(server);
    });
  });
};
