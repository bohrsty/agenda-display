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
import { format } from 'date-fns';
import { useTranslation } from './contexts/LocalisationContext.jsx';

export const AgendaItem = ({ agendaItem }) => {
    // get translation context
    const { t, dfnsLocale } = useTranslation();

    // render jsx
    return (
        <ListItem
            sx={{
                backgroundColor: agendaItem.calendar.bgColor,
                mb: 1,
            }}
        >
            <ListItemText
                primary={`${agendaItem.title}${agendaItem.location !== null ? `, ${agendaItem.location}` : ''}${agendaItem.text !== null ? ` (${agendaItem.text})` : ''}`}
                secondary={`${format(agendaItem.start, 'HH:mm', dfnsLocale)} - ${format(agendaItem.end, 'HH:mm', dfnsLocale)} ${t('o\'clock')}`}
            />
        </ListItem>
    );
}
