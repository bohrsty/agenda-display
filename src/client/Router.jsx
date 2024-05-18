/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { ErrorPage } from './ErrorPage.jsx';
import { Root } from './routes/Root.jsx';
import { Home } from './routes/Home.jsx';

// create router for the app
export const router = {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <Home />,
        },
    ]
};
