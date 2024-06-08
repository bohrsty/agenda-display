/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, { useEffect } from 'react';
import { Agenda } from '../Agenda.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';

/**
 * component to display the content of the home page
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () => {
    // get api hook
    const { _get } = useApiUtils();
    // get global state
    const { state, setState } = useGlobalState();

    // fetch agenda from api
    useEffect(() => {
        // load agenda data initially
        (async () => {
            await _get('/api/v1/agenda', (response) => {
                setState((oldState) => ({ ...oldState, agenda: response.data.payload.agenda }));
            });
        })();
        // set refresh interval
        const interval = setInterval(async () => {
            await _get('/api/v1/agenda', (response) => {
                setState((oldState) => ({ ...oldState, agenda: response.data.payload.agenda }));
            });
        }, (state.settings.refreshTimeout === 0 ? 1 : state.settings.refreshTimeout) * 60 * 1000);
        // return cleanup
        return () => clearInterval(interval)
    }, [state.settings.refreshTimeout]);

    // render jsx
    return (
        <Agenda agenda={state.agenda} />
    );
}
