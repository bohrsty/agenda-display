/*
 * This file is part of the meframe package.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { GlobalLoadingBackdrop } from '../GlobalLoadingBackdrop.jsx';
import { BottomAppBar } from '../BottomAppBar.jsx';
import { useApiUtils } from '../utils/ApiUtils.jsx';
import { useGlobalState } from '../contexts/GlobalStateContext.jsx';


export const Root = () => {
    // get api hook
    const { _post } = useApiUtils();
    // get global state hook
    const { setState } = useGlobalState();

    // render jsx
    return (
        <Grid container={true}>
            <GlobalLoadingBackdrop />
            <BottomAppBar />
            {/* TopAppBar */}
            <Box
                component={'main'}
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    pt: 8,
                    pb: 3,
                    px: 3,
                    mb: 6,
                }}
            >
                <Outlet />
            </Box>
        </Grid>
    );
}
