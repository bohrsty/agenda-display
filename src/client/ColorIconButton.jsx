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
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

export const ColorIconButton = (props) => {
    // get props
    const {
        color,
        tooltip,
        onClick,
        clearColor,
        sx,
    } = props;

    // render jsx
    return (
        typeof clearColor !== 'undefined' && clearColor === true
            ? <Tooltip
                title={tooltip}
            >
                <Button
                    onClick={onClick}
                    disableFocusRipple={true}
                    disableRipple={true}
                    disableTouchRipple={true}
                    variant={'outlined'}
                    sx={{
                        ...sx,
                        px: '5px',
                        width: '24px',
                        height: '24px',
                        minWidth: '24px',
                        mr: 1,
                        mb: 1,
                    }}
                />
            </Tooltip>
            : typeof color !== 'undefined' && color !== null && color.match(/#[a-f0-9]{6}/) !== null
                ? <Tooltip
                    title={tooltip}
                >
                    <Button
                        onClick={onClick}
                        disableFocusRipple={true}
                        disableRipple={true}
                        disableTouchRipple={true}
                        sx={{
                            ...sx,
                            px: '5px',
                            width: '24px',
                            height: '24px',
                            minWidth: '24px',
                            backgroundColor: color,
                            mr: 1,
                            mb: 1,
                            '&:hover': {
                                backgroundColor: color,
                                cursor: typeof onClick === 'undefined' ? 'default' : 'pointer',
                            },
                        }}
                    />
                </Tooltip>
                : <Button
                    disabled={true}
                    disableFocusRipple={true}
                    disableRipple={true}
                    disableTouchRipple={true}
                    size={'small'}
                    variant={'text'}
                    sx={{
                        ...sx,
                        mr: 1,
                        mb: 1,
                    }}
                />
    );
};
