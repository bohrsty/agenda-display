/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { getAgenda } from '../../Agenda.js';

/**
 * get the appointments from dav and return as agenda
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 */
export const agenda = async (req, res) => {

    // get calendar settings
    const result = await req.app.locals.redis.json.get('agendadisplay:settings', { path: '$.agendaLength' });
    let agendaLength = 7;
    if(result !== null) {
        agendaLength = result[0];
    }

    // get agenda
    const agenda = await getAgenda(agendaLength, req.app.locals.redis);

    return({
        agenda: agenda,
    });
}
