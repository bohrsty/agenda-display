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
 * get the appointments from dav and return as agenda
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {Object} the api result
 */
export const agenda = (req, res) => {
    return({
        agenda: [
            {
                day: new Date('2024-05-19'),
                items: [
                    {
                        calendar: {
                            name: 'Calendar 1',
                            bgColor: 'red',
                        },
                        from: '9:00',
                        to: '10:00',
                        title: 'Test Item 1',
                        text: 'Test Test Test Test Test Test Test Test',
                        location: 'Location',
                    },
                    {
                        calendar: {
                            name: 'Calendar 2',
                            bgColor: 'blue',
                        },
                        from: '13:00',
                        to: '20:00',
                        title: 'Test Item 2',
                        text: 'Test Test Test Test Test Test Test Test',
                        location: '',
                    },
                ],
            },
        ],
    });
}
