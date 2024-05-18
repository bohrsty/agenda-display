/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { config as _getConfig } from './api/v1/config.js';

/**
 * fills the data in the api response template and returns it as json
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {String} url the api url
 * @param {function} handler the actual handler for the api call
 * @returns {String} the api result as json
 */
const responseBody = async (req, res, url, handler) => {

    // get payload
    let payload = {};
    let status = 'OK';
    let error= null;
    let errorMessage = '';
    try {
        payload = await handler(req, res);
    } catch (e) {
        status = 'ERROR';
        error = e.errorType;
        errorMessage = e.errorMessage;
    }
    // return api data
    return res.json({
        url: url,
        version: process.env.npm_package_version,
        date: new Date(),
        status: status,
        error: error,
        errorMessage: errorMessage,
        payload: payload,
    });
}

/**
 * load the agenda-display api endpoints
 * @param {Express} app the express app
 */
export const loadApi = (app) => {

    // api handler for GET /api/v1/config
    app.get('/api/v1/config', (req, res) => responseBody(req, res, '/api/v1/config', _getConfig));
}
