/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, {
    useState,
    useEffect,
} from 'react';
import { Agenda } from '../Agenda.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';

/**
 * component to display the content of the home page
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () => {
    // prepare agenda state
    const [agenda, setAgenda] = useState([]);
    // get api hook
    const { _get } = useApiUtils();

    // fetch agenda from api
    useEffect(() => {
        (async () => {
            await _get('/api/v1/agenda', (response) => {
                setAgenda(response.data.payload.agenda);
            });
        })();
    }, []);

    // render jsx
    return (
        <Agenda agenda={agenda} />
    );
}
