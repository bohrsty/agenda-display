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
import { getColorType } from './utils/ColorUtils.jsx';

export const AgendaItem = ({ agendaItem }) => {
    // get translation context
    const { t, dfnsLocale } = useTranslation();
    // get color type of background color
    const colorType = getColorType(agendaItem.calendar.bgColor);

    // prepare date-fns options
    const dfnsOptions = {
        locale: dfnsLocale,
    };

    // render line with times
    const renderSecondary = () => {
        // check all day event
        if(agendaItem.allDay === true) {
            return undefined;
        }
        // check multiple days
        if(agendaItem.multipleDays === true) {
            return `${format(agendaItem.multipleDaysStart, 'd. MMM, HH:mm', dfnsOptions)} - ${format(agendaItem.end, 'd. MMM, HH:mm', dfnsOptions)} ${t('o\'clock')}`;
        }
        return `${format(agendaItem.start, 'HH:mm', dfnsOptions)} - ${format(agendaItem.end, 'HH:mm', dfnsOptions)} ${t('o\'clock')}`
    }

    // render jsx
    return (
        <ListItem
            sx={{
                backgroundColor: agendaItem.calendar.bgColor,
                mb: 1,
            }}
        >
            <ListItemText
                primaryTypographyProps={{
                    sx: {
                        color: colorType === 'light' ? '#ffffff' : '#000000',
                    },
                }}
                secondaryTypographyProps={{
                    sx: {
                        color: colorType === 'light' ? '#ffffff' : '#000000',
                    },
                }}
                primary={`${agendaItem.title}${agendaItem.location !== null ? `, ${agendaItem.location}` : ''}${agendaItem.text !== null ? ` (${agendaItem.text})` : ''}`}
                secondary={renderSecondary()}
            />
        </ListItem>
    );
}
