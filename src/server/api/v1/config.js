/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

/**
 * collect and return global config
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 */
export const config = (req, res) => {
    return({
        config: {
            appTitle: process.env.APP_TITLE,
            fallbackLocale: process.env.FALLBACK_LOCALE,
        },
    });
}
