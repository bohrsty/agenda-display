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
import { useCryptr } from '../../utils.js';
import { fetchDavCalendars } from '../../Agenda.js';

/**
 * collect and return settings
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 */
export const getSettings = async (req, res) => {
    // get settings
    const result = await req.app.locals.redis.json.get('agendadisplay:settings', { path: '$' });
    const settings = {
        refreshTimeout: result[0].refreshTimeout,
        calendars: result[0].calendars.map((calendar) => {
            calendar.account.editPassword = calendar.account.password;
            delete calendar.account.password;
            return calendar;
        }),
        agendaLength: result[0].agendaLength,
    }
    return({
        settings: settings,
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
    // get encrypt
    const { encrypt } = useCryptr();
    // prepare db query
    const newCalendar = { ...req.body };
    // check if calendar is given
    if(newCalendar.hasOwnProperty('calendar') === false) {
        throw new ApiException('No "calendar" parameter given in POST', 'E_MISSING_PARAM');
    }
    // add id
    newCalendar.calendar.id = nanoid();
    // encrypt password
    newCalendar.calendar.account.password = encrypt(newCalendar.calendar.account.password);
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
    // get encrypt
    const { encrypt } = useCryptr();
    // prepare db query
    const updateCalendar = { ...req.body };
    // check if calendar is given
    if(updateCalendar.hasOwnProperty('calendar') === false) {
        throw new ApiException('No "calendar" parameter given in PATCH', 'E_MISSING_PARAM');
    }
    // get id
    const id = updateCalendar.calendar.id;
    // check password
    if(updateCalendar.calendar.account.password.length > 0) {
        // encrypt new password
        updateCalendar.calendar.account.password = encrypt(updateCalendar.calendar.account.password);
    } else {
        // use current password
        updateCalendar.calendar.account.password = updateCalendar.calendar.account.editPassword;
        delete updateCalendar.calendar.account.editPassword;
    }
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
        throw new ApiException('No "refreshTimeout" parameter given in PATCH', 'E_MISSING_PARAM');
    }
    // update setting
    await req.app.locals.redis.json.set('agendadisplay:settings', '$.refreshTimeout', body.refreshTimeout);

    // return timeout
    return body.refreshTimeout;
}

/**
 * fetch calendars from dav connection
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 * @throws {ApiException}
 */
export const fetchCalendars = async (req, res) => {
    // get decrypt
    const { decrypt } = useCryptr();

    // prepare url and credentials
    const body = { ...req.body };
    // check if type is given
    if(body.hasOwnProperty('type') === false) {
        throw new ApiException('No "type" parameter given in POST', 'E_MISSING_PARAM');
    }
    // check if serverUrl is given
    if(body.hasOwnProperty('serverUrl') === false) {
        throw new ApiException('No "serverUrl" parameter given in POST', 'E_MISSING_PARAM');
    }
    // check if username is given
    if(body.hasOwnProperty('username') === false) {
        throw new ApiException('No "username" parameter given in POST', 'E_MISSING_PARAM');
    }
    // check if password is given
    if(body.hasOwnProperty('password') === false) {
        throw new ApiException('No "password" parameter given in POST', 'E_MISSING_PARAM');
    }

    // check if edit
    let password = body.password;
    if(body.type === 'edit') {
        password = decrypt(body.password);
    }

    // fetch calendars
    const calendars = await fetchDavCalendars(body.serverUrl, body.username, password);
    return {
        calendars: calendars.map((calendar) => ({url: calendar.url, name: calendar.displayName})),
    };
}
