/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

export class ApiException extends Error {
    // define vars
    errorMessage = '';
    errorType = '';

    // constructor
    constructor(type, message) {
        super(message);

        // set vars
        this.errorType = type;
        this.errorMessage = message;
    }
}
