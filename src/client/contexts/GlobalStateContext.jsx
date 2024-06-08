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
    createContext,
    useContext,
    useState,
} from 'react';

// prepare context
const GlobalStateContext = createContext({
    setState: (state) => {},
    state: {},
});

/**
 * export global state hook
 * @returns {{setState: function, state: {}}}
 */
export const useGlobalState = () => useContext(GlobalStateContext);

/**
 * Component to provide the state hook
 * @param children
 * @returns {React.ReactNode}
 */
export const GlobalStateProvider = ({ children }) => {
    // get state
    const [_state, _setState] = useState({
        config: {
            fallbackLocale: '',
            appTitle: '',
            calendarColors: [],
        },
        settings: {
            refreshTimeout: 0,
            calendars: [],
        },
        version: '',
        agenda:[],
    });

    // render jsx
    return (
        <GlobalStateContext.Provider value={{
            setState: _setState,
            state: _state,
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
}
