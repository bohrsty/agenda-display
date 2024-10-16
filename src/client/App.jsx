/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, {
    useState,
    useMemo,
} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles'
import { ColorModeProvider } from './contexts/ColorModeContext.jsx';
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx';
import { LocalizationProvider } from './contexts/LocalisationContext.jsx';
import { UiBase } from './UiBase.jsx';

export const App = () => {
    // check color mode preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // prepare color mode state
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    // create memo for toggleColorMode()
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((previousMode) => previousMode === 'light' ? 'dark' : 'light');
            },
        }),
        [],
    )

    // create memo for theme
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: mode,
            },
        }),
        [mode],
    );

    // render jsx
    return(
        <GlobalStateProvider>
            <LocalizationProvider>
                <LoadingProvider>
                    <ColorModeProvider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <UiBase />
                        </ThemeProvider>
                    </ColorModeProvider>
                </LoadingProvider>
            </LocalizationProvider>
        </GlobalStateProvider>
    );
}
