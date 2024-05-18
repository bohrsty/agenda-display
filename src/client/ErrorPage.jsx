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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link'
import {
    useRouteError,
    Link as RouterLink,
} from 'react-router-dom';
import { useTranslation } from './contexts/LocalisationContext.jsx';

/**
 * component to display a global error page
 * @returns {JSX.Element}
 * @constructor
 */
export const ErrorPage = () => {
    // get translation
    const { t } = useTranslation();
    // get error
    const error = useRouteError();

    // render jsx
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Typography
                variant={'h1'}
                sx={{
                    mb: 3,
                }}
            >
                {t('Oops!')}
            </Typography>
            <Typography paragraph={true}>
                {t('An unexpected error occurred! Goto {{link}} and try again.', {link: <Link to={'/'} component={RouterLink} >{t('Homepage')}</Link>})}
            </Typography>
            <Typography paragraph={true}><i>{error.statusText || error.message}</i></Typography>
        </Box>
    );
}

