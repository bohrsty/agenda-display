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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from './contexts/LoadingContext';

export const GlobalLoadingBackdrop = () => {
    // get loading state
    const { isLoading} = useLoading();

    // render jsx
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
            open={isLoading}
        >
            <CircularProgress color={'inherit'} />
        </Backdrop>
    );
}
