const next = require('next');
const express = require('express');

const serverHandler = require('./serverHandler');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const isAppProd = process.env.APP_ENV === 'production';
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const port = parseInt(process.env.PORT, 10) || 8081;
  const server = express();

  serverHandler(app, server);

  server.use(handler).listen(port, (err) => {
    if (err) throw err;

    if (!isAppProd) {
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    }
  });
});
