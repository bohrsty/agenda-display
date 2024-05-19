/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, { useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import ModeNightTwoToneIcon from "@mui/icons-material/ModeNightTwoTone";
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from "./contexts/LocalisationContext.jsx";
import { ColorModeContext } from "./contexts/ColorModeContext.jsx";
import { useGlobalState } from "./contexts/GlobalStateContext.jsx";

export const BottomAppBar = () => {
    // get theme
    const theme = useTheme();
    // get translation
    const { t } = useTranslation();
    // get toggleColorMode from context
    const { toggleColorMode } = useContext(ColorModeContext);
    // get global state
    const { state } = useGlobalState();

    // render jsx
    return(
        <AppBar
            position={'fixed'}
            sx={{
                top: 'auto',
                bottom: 0,
            }}
        >
            <Toolbar variant={'dense'}>
                <Typography
                    variant={'caption'}
                    color={'text.secondary'}
                >
                    {t('Version: {{version}}', {version: state.version || ''})}
                </Typography>
                <Tooltip title={theme.palette.mode === 'dark' ? t('Change to light mode') : t('Change to dark mode')} >
                    <IconButton
                        sx={{ ml: 3 }}
                        onClick={toggleColorMode}
                        color='{inherit}'
                    >
                        {theme.palette.mode === 'dark' ? <LightModeTwoToneIcon /> : <ModeNightTwoToneIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('Settings')}>
                    <Link
                        color={'inherit'}
                        to={'/settings'}
                        component={RouterLink}
                    >
                    <IconButton
                        sx={{ ml: 3 }}
                        color={'inherit'}
                    >
                        <SettingsTwoToneIcon />
                    </IconButton>
                    </Link>
                </Tooltip>
                <Tooltip title={t('Refresh')}>
                    <IconButton
                        sx={{ ml: 3 }}
                        color={'inherit'}
                        onClick={() => {}}
                    >
                        <CachedTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
