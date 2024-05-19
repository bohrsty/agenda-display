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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const AgendaItem = ({ agendaItem }) => {

    // render jsx
    return (
        <ListItem
            sx={{
                backgroundColor: agendaItem.calendar.bgColor,
            }}
        >
            <ListItemText
                primary={`${agendaItem.from} - ${agendaItem.to} ${agendaItem.title}`}
                secondary={`${agendaItem.text} (${agendaItem.location})`}
            />
        </ListItem>
    );
}
