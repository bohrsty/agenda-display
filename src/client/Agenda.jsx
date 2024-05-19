/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React from 'react';
import List from '@mui/material/List';
import { AgendaSection } from './AgendaSection.jsx';

export const Agenda = ({ agenda }) => {

    // render jsx
    return (
        <List
            dense={true}
            subheader={<li />}
            sx={{
                width: '100%',
                height: 'calc(100vh - 104px)',
                overflowY: 'auto',
            }}
        >
            {agenda.map((agendaSection, index) => <AgendaSection key={`section-${index}`} agendaSection={agendaSection} />)}
        </List>
    );
}
