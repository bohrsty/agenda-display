/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import {
    useEffect,
    useState,
} from 'react';
import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { router } from './Router.jsx';
import { useGlobalState } from './contexts/GlobalStateContext.jsx';
import { useApiUtils } from './utils/ApiUtils.jsx';

export const UiBase = () => {
    // get global state
    const { state, setState } = useGlobalState();
    // get api hook
    const { _get } = useApiUtils();

    // fetch initial values from api
    useEffect(() => {
        (async () => {
            // get config
            await _get('/api/v1/config', (response) => {
                setState((oldState) => ({...oldState, config: response.data.payload.config, version: response.data.version}));
            });
            // get settings
            await _get('/api/v1/settings', (response) => {
                setState((oldState) => ({...oldState, settings: response.data.payload.settings}));
            });
        })();
    }, []);

    // render jsx
    return(
        <CssBaseline enableColorScheme={true}>
            <RouterProvider router={createBrowserRouter([router])} />
        </CssBaseline>
    );
}
