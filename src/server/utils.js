/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import Cryptr from 'cryptr';
import { EncryptionException } from './exceptions/EncryptionException.js';

/**
 * prepare encrypt/decrypt from cryptr
 * @throws EncryptionException
 * @returns {{encrypt: function, decrypt: function}}
 */
export const useCryptr = () => {
    // check encryption key
    if(process.env.hasOwnProperty('ENCRYPTION_KEY') === false) {
        throw new EncryptionException('ENCRYPTION_KEY does not exists in .env');
    }
    if(process.env.ENCRYPTION_KEY.length < 32) {
        throw new EncryptionException('ENCRYPTION_KEY is too short, key must be at least 32 characters long');
    }
    // create encryption object and functions
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    return {
        encrypt: cryptr.encrypt,
        decrypt: cryptr.decrypt,
    }
}
