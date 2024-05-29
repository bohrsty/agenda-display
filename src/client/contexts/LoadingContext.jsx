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
const LoadingContext = createContext({
    startLoading: (id) => {},
    stopLoading: (id) => {},
    isLoading: false,
});

/**
 * export loading hook
 * @returns {{isLoading: boolean, stopLoading: function, startLoading: function}}
 */
export const useLoading = () => useContext(LoadingContext);

/**
 * Component to provide the state hook
 * @param children
 * @returns {React.ReactNode}
 */
export const LoadingProvider = ({ children }) => {
    // get loading
    const [loading, setLoading] = useState([]);

    /**
     * start loading for id
     * @param {String} id the named id
     * @returns void
     */
    const startLoading = (id) => {
        setLoading((prevLoading) =>[...prevLoading, id]);
    };

    /**
     * stop loading for id
     * @param {String} id the named  id
     * @returns void
     */
    const stopLoading = (id) => {
        setLoading((prevLoading) => prevLoading.filter((item) => item !== id));
    };

    // render jsx
    return (
        <LoadingContext.Provider value={{
            startLoading: startLoading,
            stopLoading: stopLoading,
            isLoading: loading.length > 0,
        }}>
            {children}
        </LoadingContext.Provider>
    );
}
