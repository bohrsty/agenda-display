/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, { useState } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '../contexts/LocalisationContext.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';
import { SettingsCalendarItem } from './SettingsCalendarItem.jsx';
import { SettingsCalendarItemConfirmDeleteDialog } from './SettingsCalendarItemConfirmDeleteDialog.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';
import { SettingsCalendarItemForm } from './SettingsCalendarItemForm.jsx';

export const SettingsCalendars = () => {
    // get delete calendar state
    const [deleteCalendar, setDeleteCalendar] = useState(null);
    // get new/edit calendar state
    const [calendarForm, setCalendarForm] = useState({
        type: null,
        calendar: {
            name: '',
            username: '',
            url: '',
            color: '',
        },
    });
    // get global state
    const { state, setState } = useGlobalState();
    // get translation
    const { t } = useTranslation();
    // get api
    const { _get, _delete, _post, _patch } = useApiUtils();

    // event handler to edit connection
    const handleEditConnection = (calendar) => {
        calendar. password = '';
        setCalendarForm({
            type: 'edit',
            calendar: calendar,
        });
    };

    // event handler to delete connection
    const handleDeleteConnection = (calendar) => {
        // open confirm dialog
        setDeleteCalendar(calendar);
    };

    // event handler to confirm connection deletion
    const handleConfirmDeleteConnection = async () => {
        // close dialog
        setDeleteCalendar(null);
        // call delete api
        await _delete('api/v1/settings/calendar', { calendar: deleteCalendar }, async () => {
            // get settings
            await _get('/api/v1/settings', (response) => {
                setState((oldState) => ({...oldState, settings: response.data.payload.settings}));
            });
        });
    };

    // event handler to cancel connection deletion
    const handleCancelDeleteConnection = () => {
        // close dialog
        setDeleteCalendar(null);
    };

    // event handler to save new/edit connection
    const handleSaveConnection = async () => {
        // check type
        if(calendarForm.type === 'new') {
            // call post api
            await _post('api/v1/settings/calendar', { calendar: calendarForm.calendar }, async () => {
                // get settings
                await _get('/api/v1/settings', (response) => {
                    setState((oldState) => ({...oldState, settings: response.data.payload.settings}));
                });
            });
        } else {
            // call patch api
            await _patch('api/v1/settings/calendar', { calendar: calendarForm.calendar }, async () => {
                // get settings
                await _get('/api/v1/settings', (response) => {
                    setState((oldState) => ({...oldState, settings: response.data.payload.settings}));
                });
            });
        }
        // close dialog
        setCalendarForm((oldstate) => ({...oldstate, type: null}));
    };

    // event handler to cancel new/edit connection
    const handleCancelConnection = () => {
        // close dialog
        setCalendarForm((oldstate) => ({...oldstate, type: null}));
    };

    // render jsx
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
                width: 'calc(50vw)',
            }}
        >
            <Typography paragraph={true}>
                {t('Caldav connections:')}
                <Tooltip title={t('Add caldav connection')}>
                    <IconButton
                        onClick={() => setCalendarForm({
                            type: 'new',
                            calendar: {
                                name: '',
                                username: '',
                                password: '',
                                url: '',
                                color: '',
                            },
                        })}
                        sx={{
                            ml: 2,
                        }}
                    >
                        <AddTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <List>
                {state.settings.calendars.map((calendar, index) => {
                    return (
                        <SettingsCalendarItem
                            key={`calendar-${index}`}
                            calendar={calendar}
                            editConnection={(calendar) => handleEditConnection(calendar)}
                            deleteConnection={(calendar) => handleDeleteConnection(calendar)}
                        />
                    );
                })}
            </List>
            <SettingsCalendarItemConfirmDeleteDialog
                open={deleteCalendar !== null}
                handleDelete={() => handleConfirmDeleteConnection()}
                handleCancel={() => handleCancelDeleteConnection()}
            />
            <SettingsCalendarItemForm
                open={calendarForm.type !== null}
                handleCancel={() => handleCancelConnection()}
                handleSave={() => handleSaveConnection()}
                data={calendarForm}
                setData={setCalendarForm}
            />
        </Box>
    );
}
