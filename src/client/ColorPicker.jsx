/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { ColorIconButton } from './ColorIconButton.jsx';
import { useTranslation } from './contexts/LocalisationContext.jsx';
import Typography from '@mui/material/Typography';

export const ColorPicker = ({ value, onChange, colors, isRequired, isDisabled, label, placeholder, sx }) => {
    // get anchor state
    const [anchorEl, setAnchorEl] = useState(null);
    // prepare open state from anchor
    const open = Boolean(anchorEl);

    // get translation hook
    const { t } = useTranslation();


    // render jsx
    return (
        <>
            <Stack
                direction={'row'}
                sx={{...sx}}
            >
                <Tooltip
                    title={t('Select calendar color')}
                >
                    <Button
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        disableFocusRipple={true}
                        disableRipple={true}
                        disableTouchRipple={true}
                        variant={value.match(/#[a-f0-9]{6}/) === null ? 'outlined' : undefined}
                        sx={{
                            height: '56px',
                            width: 0.3,
                            mb: 1,
                            backgroundColor: value.match(/#[a-f0-9]{6}/) !== null ? value : 'inherit',
                            '&:hover': {
                                backgroundColor: value.match(/#[a-f0-9]{6}/) !== null ? value : 'inherit',
                            },
                        }}
                    />
                </Tooltip>
                <TextField
                    fullWidth={true}
                    value={value}
                    onFocus={(event) => {
                        setAnchorEl(event.currentTarget)
                    }}
                    disabled={isDisabled}
                    label={label}
                    placeholder={placeholder}
                    required={isRequired}
                    inputProps={{
                        readOnly: true,
                    }}
                    InputLabelProps={value !== '' ? {shrink: true} : undefined }
                />
            </Stack>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() => setAnchorEl(null)}
                sx={{
                    '& .MuiPopover-paper': {
                        p: 2,
                        width: '300px',
                    },
                }}
            >
                <Typography
                    paragraph={true}
                    variant={'h5'}
                >
                    {t('Select color')}
                </Typography>
                <ColorIconButton
                    clearColor={true}
                    onClick={() => {
                        onChange('');
                        setAnchorEl(null)
                    }}
                    tooltip={t('Unselect color')}
                />
                {
                    colors.map((color) => (
                        <ColorIconButton
                            key={color}
                            color={color}
                            onClick={() => {
                                onChange(color);
                                setAnchorEl(null)
                            }}
                            tooltip={t('Select color {{color}}', {color: color})}
                        />
                    ))
                }
            </Popover>
        </>
    );
};
