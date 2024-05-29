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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useTranslation } from '../contexts/LocalisationContext.jsx';

export const SettingsCalendarItemForm = ({ open, handleSave, handleCancel, data, setData }) => {
    // get translation
    const { t } = useTranslation();

    // render jsx
    return (
        <Dialog open={open}>
            <DialogTitle>{data.type === 'new' ? t('New caldav connection') : t('Edit caldav connection "{{connectionName}}"', { connectionName: data.calendar.name })}</DialogTitle>
            <DialogContent dividers={true}>
                <Typography paragraph={true}>{t('Please fill the following fields (* mandatory)')}</Typography>
                <TextField
                    required={true}
                    placeholder={t('Connection name')}
                    label={t('Connection name')}
                    type={'text'}
                    value={data.calendar.name}
                    onChange={(event) => setData({...data, calendar: {...data.calendar, name: event.target.value}})}
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
                    value={data.calendar.username}
                    onChange={(event) => setData({...data, calendar: {...data.calendar, username: event.target.value}})}
                    sx={{
                        width: '350px',
                        ml: 2,
                        mb: 2,
                    }}
                />
                <TextField
                    required={true}
                    placeholder={t('Connection URL')}
                    label={t('Connection URL')}
                    type={'text'}
                    value={data.calendar.url}
                    onChange={(event) => setData({...data, calendar: {...data.calendar, url: event.target.value}})}
                    sx={{
                        width: '350px',
                        ml: 2,
                        mb: 2,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCancel()}>{t('Cancel')}</Button>
                <Button onClick={() => handleSave()}>{t('Save')}</Button>
            </DialogActions>
        </Dialog>
    );
}
