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
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '../contexts/LocalisationContext.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';

export const SettingsRefreshTimeout = () => {
    // get global state
    const { state, setState } = useGlobalState();
    // get translation
    const { t } = useTranslation();
    // get api
    const { _get, _patch } = useApiUtils();

    // event handler to handle save timeout
    const handleSaveTimeout = async () => {
        // call patch api
        await _patch('api/v1/settings/refreshTimeout', { refreshTimeout: state.settings.refreshTimeout }, async () => {
            // get settings
            await _get('/api/v1/settings', (response) => {
                setState((oldState) => ({...oldState, settings: response.data.payload.settings}));
            });
        });
    };

    // render jsx
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
            }}
        >
            <Typography paragraph={true}>{t('Refresh Timeout in minutes:')}</Typography>
            <OutlinedInput
                required={true}
                type={'number'}
                value={state.settings.refreshTimeout}
                onChange={(event) => setState({...state, settings: {...state.settings, refreshTimeout: parseInt(event.target.value, 10)}})}
                endAdornment={
                    <InputAdornment position={'end'}>
                        <Tooltip title={t('Save')}>
                            <IconButton
                                onClick={() => handleSaveTimeout()}
                                edge={'end'}
                            >
                                <SaveTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
                sx={{
                    width: '150px',
                    ml: 2,
                }}
            />
        </Box>
    );
}
