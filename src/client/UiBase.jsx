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

    // fetch config from api
    useEffect(() => {
        (async () => {
            await _get('/api/v1/config', (response) => {
                setState({...state, config: response.data.payload.config, version: response.data.version});
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
