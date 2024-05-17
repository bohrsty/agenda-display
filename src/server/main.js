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

// prepare express
const app = express();
app.set('x-powered-by', false);
app.set('trust proxy', true);

// add body-parser
app.use(bodyParser.json());

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
