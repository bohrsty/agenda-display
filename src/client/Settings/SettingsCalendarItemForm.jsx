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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from '../contexts/LocalisationContext.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';
import { SettingsCalendarDavCalendar } from './SettingsCalendarDavCalendar.jsx';

export const SettingsCalendarItemForm = ({ open, handleSave, handleCancel, data, setData }) => {
    // get translation
    const { t } = useTranslation();
    // get global state
    const { state } = useGlobalState();
    // get api utils
    const { _post } = useApiUtils();
    // get snackbar open state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // get alert content state
    const [alert, setAlert] = useState('');

    // event handler to fetch calendars from api
    const handleFetchCalendars = async () => {
        // check edit
        let password = data.calendar.account.password;
        if(data.type === 'edit' && data.calendar.account.password === '') {
            password = data.calendar.account.editPassword;
        }
        // call api to fetch calendars
        try {
            await _post('api/v1/settings/fetchCalendars', { type: data.type, serverUrl: data.calendar.serverUrl, username: data.calendar.account.username, password: password }, (response) => {
                const calendars = response.data.payload.calendars.reduce((previous, current) => {
                    return {
                        ...previous,
                        [current.url]: {
                            name: current.name,
                            enabled: false,
                            bgColor: '',
                        }
                    }
                }, {});
                setData({...data, calendar: {...data.calendar, calendars: calendars}});
            });
        } catch(exception) {
            // show error message
            setAlert(exception.errorMessage);
            setSnackbarOpen(true);
        }
    }

    // render jsx
    return (
        <>
            <Dialog open={open}>
                <DialogTitle>{data.type === 'new' ? t('New caldav connection') : t('Edit caldav connection')}</DialogTitle>
                <DialogContent dividers={true}>
                    <Typography paragraph={true}>{t('Please fill the following fields (* mandatory)')}</Typography>
                    <TextField
                        required={true}
                        placeholder={t('Connection URL')}
                        label={t('Connection URL')}
                        type={'text'}
                        value={data.calendar.serverUrl}
                        onChange={(event) => setData({...data, calendar: {...data.calendar, serverUrl: event.target.value}})}
                        sx={{
                            width: '350px',
                            ml: 2,
                            mb: 2,
                        }}
                    />
                    <TextField
                        required={true}
                        placeholder={t('Username')}
                        label={t('Username')}
                        type={'text'}
                        value={data.calendar.account.username}
                        onChange={(event) => setData({...data, calendar: {...data.calendar, account: {...data.calendar.account, username: event.target.value}}})}
                        sx={{
                            width: '350px',
                            ml: 2,
                            mb: 2,
                        }}
                    />
                    <TextField
                        required={data.type === 'new'}
                        placeholder={data.type === 'new' ? t('Password') : t('Enter new password to change it')}
                        label={data.type === 'new' ? t('Password') : t('Enter new password to change it')}
                        type={'password'}
                        value={data.calendar.password}
                        onChange={(event) => setData({...data, calendar: {...data.calendar, account: {...data.calendar.account, password: event.target.value}}})}
                        sx={{
                            width: '350px',
                            ml: 2,
                            mb: 2,
                        }}
                    />
                    {
                        data.type === 'edit' || data.calendar.calendars !== null
                        ? <>
                            {Object.keys(data.calendar.calendars).map((url, index) => <SettingsCalendarDavCalendar
                                key={`davCalendar${index}`}
                                url={url}
                                data={data}
                                setData={setData}
                            />)}
                        </>
                        : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCancel()}>{t('Cancel')}</Button>
                    {data.calendar.calendars !== null ? <Button onClick={() => handleSave()}>{t('Save')}</Button> : null}
                    <Button onClick={() => handleFetchCalendars()}>{t('Fetch calendars')}</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={'error'}
                    variant={'filled'}
                    sx={{ width: '100%' }}
                >
                    <Typography paragraph={true}>{t('The following error occurred while fetching the calendars:')}</Typography>
                    <Typography paragraph={true}>{alert}</Typography>
                </Alert>
            </Snackbar>
        </>
    );
}
