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
import { useTranslation } from '../contexts/LocalisationContext.jsx';

export const SettingsCalendarItemConfirmDeleteDialog = ({ open, handleDelete, handleCancel}) => {
    // get translation
    const { t } = useTranslation();

    // render jsx
    return (
        <Dialog open={open}>
            <DialogTitle>{t('Confirm delete caldav connection')}</DialogTitle>
            <DialogContent dividers={true}>
                <Typography paragraph={true}>{t('Are you sure to delete this caldav connection?')}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCancel()}>{t('Cancel')}</Button>
                <Button onClick={() => handleDelete()}>{t('Delete')}</Button>
            </DialogActions>
        </Dialog>
    );
}
