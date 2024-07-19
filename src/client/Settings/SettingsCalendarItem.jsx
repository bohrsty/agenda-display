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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '../contexts/LocalisationContext.jsx';

export const SettingsCalendarItem = ({ calendar, editConnection, deleteConnection }) => {
    // get translation
    const { t } = useTranslation();

    // render jsx
    return (
        <ListItem
            secondaryAction={
                <>
                    <Tooltip title={t('Edit connection')}>
                        <IconButton
                            onClick={() => editConnection(calendar)}
                        >
                            <EditTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete connection')}>
                        <IconButton
                            onClick={() => deleteConnection(calendar)}
                            edge={'end'}
                        >
                            <DeleteTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        >
            <ListItemText
                primary={calendar.serverUrl}
                secondary={calendar.account.username}
            />
        </ListItem>
    );
}
