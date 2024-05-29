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
    constructor(message, type) {
        super(message);
        this.errorType = type;
    }
}
