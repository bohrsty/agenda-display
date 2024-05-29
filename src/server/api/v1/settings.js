/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { nanoid } from 'nanoid';
import { ApiException } from '../../exceptions/ApiException.js';

/**
 * collect and return settings
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 */
export const getSettings = async (req, res) => {
    // get settings
    const result = await req.app.locals.redis.json.get('agendadisplay:settings', { path: '$' });
    return({
        settings: result[0],
    });
}

/**
 * delete calendar setting
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 * @throws {ApiException}
 */
export const deleteSettingCalendar = async (req, res) => {
    // prepare db query
    const deletedCalendar = { ...req.body };
    // check if calendar is given
    if(deletedCalendar.hasOwnProperty('calendar') === false) {
        throw new ApiException('No "calendar" parameter given in DELETE', 'E_MISSING_PARAM');
    }
    // get id
    const id = deletedCalendar.calendar.id;
    // delete calendar
    await req.app.locals.redis.json.del('agendadisplay:settings', `$.calendars[?(@id == "${id}")]`);

    // return deleted calendar
    return deletedCalendar.calendar;
}

/**
 * new calendar setting
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 * @throws {ApiException}
 */
export const newSettingCalendar = async (req, res) => {
    // prepare db query
    const newCalendar = { ...req.body };
    // check if calendar is given
    if(newCalendar.hasOwnProperty('calendar') === false) {
        throw new ApiException('No "calendar" parameter given in DELETE', 'E_MISSING_PARAM');
    }
    // add id
    newCalendar.calendar.id = nanoid();
    // insert calendar
    await req.app.locals.redis.json.arrAppend('agendadisplay:settings', '$.calendars', newCalendar.calendar);

    // return new calendar
    return newCalendar.calendar;
}

/**
 * update calendar setting
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 * @throws {ApiException}
 */
export const updateSettingCalendar = async (req, res) => {
    // prepare db query
    const updateCalendar = { ...req.body };
    // check if calendar is given
    if(updateCalendar.hasOwnProperty('calendar') === false) {
        throw new ApiException('No "calendar" parameter given in DELETE', 'E_MISSING_PARAM');
    }
    // get id
    const id = updateCalendar.calendar.id;
    // update calendar
    await req.app.locals.redis.json.set('agendadisplay:settings', `$.calendars[?(@id == "${id}")]`, updateCalendar.calendar);

    // return updated calendar
    return updateCalendar.calendar;
}

/**
 * update timeout setting
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 * @throws {ApiException}
 */
export const updateTimeoutSetting = async (req, res) => {
    // prepare db query
    const body = { ...req.body };
    // check if timeout is given
    if(body.hasOwnProperty('refreshTimeout') === false) {
        throw new ApiException('No "refreshTimeout" parameter given in DELETE', 'E_MISSING_PARAM');
    }
    // update setting
    await req.app.locals.redis.json.set('agendadisplay:settings', '$.refreshTimeout', body.refreshTimeout);

    // return timeout
    return body.refreshTimeout;
}
