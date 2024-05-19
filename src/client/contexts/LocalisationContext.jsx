/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import {
    isValidElement,
    Fragment,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { de as dfnsDe } from 'date-fns/locale/de';
import { useGlobalState } from './GlobalStateContext.jsx';
import { de } from '../i18n/de/de.jsx'

// prepare context
const LocalizationContext = createContext({
    t: (scope, options) => {},
    locale: '',
    setLocale: (locale) => {},
    dfnsLocale: {},
});

/**
 *
 * @returns {{t: t, locale: string, setLocale: setLocale}}
 */
export const useTranslation = () => useContext(LocalizationContext);

/**
 * Component to provide the translation hook
 * @param children
 * @returns {React.ReactNode}
 */
export const LocalizationProvider = ({ children }) => {
    // get locale state
    const [currentLocale, setCurrentLocale] = useState(
        window.navigator.languages
            ? window.navigator.languages[0]
            : (window.navigator.language || window.navigator.userLanguage)
    );
    // get global state hook
    const { state } = useGlobalState();

    // prepare translations
    const translations = {
        'de_de': de,
        'de-DE': de,
        'de': de,
    };

    // prepare date-fns locales
    const dfnsLocales = {
        'de_de': dfnsDe,
        'de-DE': dfnsDe,
        'de': dfnsDe,
    };

    // check locale and fallback
    useEffect(() => {
        if(!translations.hasOwnProperty(currentLocale)) {
            setCurrentLocale(state.config.fallbackLocale);
        }
    }, [currentLocale]);

    /**
     * sets the current locale
     * @param locale
     * @returns void
     */
    const setLocale = (locale) => {
        setLocale(locale);
    };

    /**
     * translates the given scope key and replaces variables
     * @param {string} scope the translation key
     * @param {object} options the replacement or pluralisation options
     * @returns {string|array} the translated string or array of strings and react elements if options contain one
     */
    const t = (scope, options) => {

        // check options
        if(typeof options === 'undefined') {
            options = {};
        }

        // get value from translations object
        let value = translations[currentLocale][scope];

        // check value undefined, translation missing
        if(typeof value === 'undefined') {
            return `[${scope}]: ${translations[currentLocale]['Missing translation'] || 'Missing translation'}`;
        }

        // check pluralisation
        if(typeof value === 'object') {
            // check if count option exists or set to 0
            if(!options.hasOwnProperty('count')) {
                options.count = 0;
            }
            // ensure count is int
            const count = parseInt(options.count, 10);
            // check count value
            switch(count) {
                case 0:
                    value = value.zero;
                    break;
                case 1:
                    value = value.one;
                    break;
                default:
                    value = value.other;
            }
        }

        // replace variables
        if(Object.keys(options).length > 0) {

            // walk through options
            for(const option in options) {
                if(isValidElement(options[option]) === false) {
                    value = value.replace(`{{${option}}}`, options[option]);
                }
            }
            // check if there are still replacements
            const replacements = value.match(/\{\{\w+\}\}/g);
            if(replacements !== null && replacements.length > 0) {
                // split value
                const splitValue = value.split(' ');
                // walk through split values
                value = splitValue.map((item) => {
                    // check if item is replaceable
                    const matchedItem = item.match(/(?<before>.*)(?<match>\{\{\w+\}\})(?<after>.*)/);
                    if(matchedItem !== null && matchedItem.length > 0) {
                        // clean item from {{}}
                        const cleanedItem = matchedItem.groups['match'].slice(2, -2);
                        // check replacements
                        if(cleanedItem in options) {
                            item = <Fragment key={cleanedItem}>{matchedItem.groups.before}{options[cleanedItem]}{matchedItem.groups.after} </Fragment>;
                        } else {
                            item += ' ';
                        }
                    } else {
                        item += ' ';
                    }
                    // return string or element
                    return item;
                });
            }
        }

        // return translation
        return value;
    }

    // render jsx
    return (
        <LocalizationContext.Provider value={{
            t: t,
            locale: currentLocale,
            setLocale: setLocale,
            dfnsLocale: dfnsLocales[currentLocale],
        }}>
            {children}
        </LocalizationContext.Provider>
    );
}
