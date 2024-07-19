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
    createAccount,
    fetchCalendars,
    fetchCalendarObjects,
} from 'tsdav';
import {
    startOfDay,
    addDays,
    compareAsc,
    isSameDay,
} from 'date-fns';
import IcalExpander from 'ical-expander';
import { useCryptr } from './utils.js';


/**
 *
 * @param {String} serverUrl the server url to fetch the calendars from
 * @param {String} username the username for the dav account
 * @param {String} password the password for the dav account
 * @return {Array} array containing the calendars of the dav account
 */
export const fetchDavCalendars = async (serverUrl, username, password) => {
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

    // create dav account
    const account = await createAccount({
        account: {
            serverUrl: serverUrl,
            accountType: 'caldav',
        },
        headers: {
            authorization: basicAuth,
        },
    });

    // get calendars
    return await fetchCalendars({
        account: account,
        headers: {
            authorization: basicAuth,
        },
    });
}

/**
 * get, merge and return the dav calendar entries
 *
 * @param {number} agendaLength the number of days the agenda should be displayed
 * @param {RedisClient} redis the redis client
 * @returns {Array} the agenda sections and appointments
 */
export const getAgenda = async (agendaLength, redis) => {
    // get cryptr functions
    const { decrypt } = useCryptr();

    // get calendar settings
    const result = await redis.json.get('agendadisplay:settings', { path: '$.calendars' });
    // check calendars
    if(result === null || result[0].length === 0) {
        return [];
    }

    // walk through calendar entries
    let allAppointments = await Promise.all(result[0].map(async (calendarEntry) => {
        // prepare username and password
        const username = calendarEntry.account.username;
        const password = decrypt(calendarEntry.account.password);
        const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
        // fetch dav calendars
        let davCalendars = await fetchDavCalendars(calendarEntry.serverUrl, username, password);
        davCalendars = davCalendars.filter((calendar) => calendarEntry.calendars.hasOwnProperty(calendar.url) && calendarEntry.calendars[calendar.url].enabled === true);

        // prepare start and end dates (end date +2, because today is shown always completely)
        const start = startOfDay(new Date());
        const end = addDays(start, agendaLength + 2);

        // get appointments
        const appointments = await Promise.all(davCalendars.map(async (calendar) => {
            // fetch calendar entries
            const entries = await fetchCalendarObjects({
                calendar: calendar,
                headers: {
                    authorization: basicAuth,
                },
                expand: true,
                timeRange: {
                    start: start.toISOString(),
                    end: end.toISOString(),
                },
            });

            // parse dav to events
            return parseDavToEvents(entries.map((a) => a.data), start, end).map((event) =>({
                ...event,
                calendar: {
                    name: calendar.displayName,
                    bgColor: calendarEntry.calendars[calendar.url].bgColor,
                },
            }));
        }));
        // reduce and return events from all dav calendars
        return appointments.reduce((previous, current) => previous.concat(current), []);
    }));
    allAppointments = allAppointments.reduce((previous, current) => previous.concat(current), []);

    // sort all appointments
    allAppointments.sort((first, second) => {
        // check start
        const comparedStart = compareAsc(first.start, second.start);
        if(comparedStart !== 0) {
            return comparedStart;
        }
        return compareAsc(first.end, second.end);
    });

    // sort appointments in sections
    const sectionedAppointments = [];
    let currentSection = {
        day: null,
        items: [],
    };
    allAppointments.forEach((event) => {
        if(currentSection.day === null) {
            currentSection = {
                day: startOfDay(event.start),
                items: [],
            };
            currentSection.items.push(event);
        } else if(isSameDay(startOfDay(event.start), currentSection.day) === false) {
            sectionedAppointments.push(currentSection);
            currentSection = {
                day: startOfDay(event.start),
                items: [],
            };
            currentSection.items.push(event);
        } else {
            currentSection.items.push(event);
        }
    });

    // return
    return sectionedAppointments;
}

/**
 * parse the dav result to get event list
 * @param {Array} dav an array of dav results to parse
 * @param {Date} start the start date
 * @param {Date} end the end date
 * @return {Object[]} array of parsed events
 */
const parseDavToEvents = (dav, start, end) => {
    return dav.map((davEvent) => {
        const icalExpander = new IcalExpander({ics: davEvent, maxIterations: 50});
        const events = icalExpander.between(start, end);
        const mappedEvents = events.events.map(e => ({
            start: e.startDate.toJSDate(),
            end: e.endDate.toJSDate(),
            title: e.summary,
            location: e.location,
            text: e.description,
        }));
        const mappedOccurrences = events.occurrences.map(o => ({
            start: o.startDate.toJSDate(),
            end: o.endDate.toJSDate(),
            title: o.item.summary,
            location: o.item.location,
            text: o.item.description,
        }));
        return [].concat(mappedEvents, mappedOccurrences);
    }).reduce((previous, current) => previous.concat(current), []);
}
