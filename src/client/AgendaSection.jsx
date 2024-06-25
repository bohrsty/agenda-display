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
import ListSubheader from '@mui/material/ListSubheader';
import {
    format,
    isSameDay,
} from 'date-fns';
import { AgendaItem } from './AgendaItem.jsx';
import { useTranslation } from './contexts/LocalisationContext.jsx';

export const AgendaSection = ({ agendaSection }) => {
    // get translation context
    const { t, dfnsLocale } = useTranslation();

    // prepare date-fns options
    const dfnsOptions = {
        locale: dfnsLocale,
    };

    // render jsx
    return (
        <li>
            <ul>
                <ListSubheader>{isSameDay(agendaSection.day, new Date()) ? t('Today') : format(agendaSection.day, 'EEEE, d. MMMM yyyy', dfnsOptions)}</ListSubheader>
                {agendaSection.items.map((agendaItem, index) => <AgendaItem key={`item-${index}`} agendaItem={agendaItem} />)}
            </ul>
        </li>
    );
}
