/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { createContext } from 'react';

// create and export the context with the toggle function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

/**
 * provider component for context
 * @param {Object} value the value given to the provider
 * @param {JSX.Element[]} children the children of the provider element
 * @returns {JSX.Element}
 * @constructor
 */
export const ColorModeProvider = ({ value, children }) => {
    return (
        <ColorModeContext.Provider value={value}>
            {children}
        </ColorModeContext.Provider>
    );
}
