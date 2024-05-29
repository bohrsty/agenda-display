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
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTranslation } from '../contexts/LocalisationContext.jsx';
import { SettingsRefreshTimeout } from '../Settings/SettingsRefreshTimeout.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';
import { SettingsCalendars } from '../Settings/SettingsCalendars.jsx';

/**
 * component to display the content of the home page
 * @returns {JSX.Element}
 * @constructor
 */
export const Settings = () => {
    // get translation
    const { t } = useTranslation();
    // get global state
    const { state, setState } = useGlobalState();
    // get api hook
    const { _get } = useApiUtils();

    // event handler for reloading settings
    const handleReloadSettings = async () => {
        await _get('/api/v1/settings', (response) => {
            setState({...state, settings: response.data.payload.settings});
        });
    }

    // render jsx
    return (
        <Stack
            sx={{
                width: '100%',
            }}
        >
            <Typography variant={'h3'}>{t('Settings')}</Typography>
            <Box
                sx={{
                    mt: 3,
                    mb: 2,
                }}
            >
                <Tooltip title={t('Back')}>
                    <Link
                        color={'text.secondary'}
                        to={'/'}
                        component={RouterLink}
                    >
                        <IconButton
                            sx={{ ml: 3 }}
                            color={'inherit'}
                        >
                            <ArrowBackTwoToneIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
                <Tooltip title={t('Reload Settings')}>
                    <IconButton
                        sx={{ ml: 3 }}
                        color={'inherit'}
                        onClick={() => handleReloadSettings()}
                    >
                        <CachedTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Divider />
            <SettingsRefreshTimeout />
            <Divider />
            <SettingsCalendars />
        </Stack>
    );
}
