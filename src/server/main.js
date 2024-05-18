/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import express from 'express';
import ViteExpress from 'vite-express';
import bodyParser from 'body-parser';
import { createClient } from 'redis';
import { loadApi } from './Api.js';

// prepare express
const app = express();
app.set('x-powered-by', false);
app.set('trust proxy', true);

// create and connect redis client
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || '6379'}`,
});
await redisClient.connect();

// add redis client to app (locals), to use in requests as "req.app.locals.redis"
app.locals.redis = redisClient;

// add body-parser
app.use(bodyParser.json());

// load api endpoints
loadApi(app);

// add transformer
const transformer = (html) => (
    html.replace(
        '<!-- title -->',
        process.env.APP_TITLE
    )
);

// add ViteExpress config
ViteExpress.config({
    transformer: transformer,
});
// start server
ViteExpress.listen(app, 3000, () => {
    if (process.env.NODE_ENV === 'production') {
        console.log("Server is listening on port 3000...");
    }
});
