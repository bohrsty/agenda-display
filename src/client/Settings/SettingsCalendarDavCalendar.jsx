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
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { ColorPicker } from '../ColorPicker.jsx';
import { useTranslation } from '../contexts/LocalisationContext.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';

export const SettingsCalendarDavCalendar = ({ url, data, setData }) => {
    // get translation
    const { t } = useTranslation();
    // get global state
    const { state } = useGlobalState();
    // get calendar
    const calendar = data.calendar.calendars[url];

    // render jsx
    return (
        <Stack
            direction={'row'}
            sx={{
                width: '500px',
                ml: 3,
                mb: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Tooltip title={t('Check to show in agenda')}>
                <Checkbox
                    checked={calendar.enabled}
                    onChange={(event) => setData({...data, calendar: {...data.calendar, calendars: {...data.calendar.calendars, [url]: {...data.calendar.calendars[url], enabled: event.target.checked}}}})}
                />
            </Tooltip>
            <Typography>{calendar.name}</Typography>
            <ColorPicker
                colors={state.config.calendarColors}
                label={t('Calendar color')}
                placeholder={t('Calendar color')}
                isDisabled={false}
                isRequired={calendar.enabled}
                value={data.calendar.calendars[url].bgColor}
                onChange={(color) => setData({...data, calendar: {...data.calendar, calendars: {...data.calendar.calendars, [url]: {...data.calendar.calendars[url], bgColor: color}}}})}
                sx={{
                    ml: 1,
                }}
            />
        </Stack>
    );
}
