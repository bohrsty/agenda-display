/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */
'use strict';

import { useLoading } from '../contexts/LoadingContext.jsx';
import axios from 'axios';
import { ApiException } from '../exceptions/ApiException.jsx';

export const useApiUtils = () => {
    // get loading hooks
    const { startLoading, stopLoading } = useLoading();

    // get function
    const _get = async (url, params, callback) => {
        try {
            // start loading
            startLoading(`GET${url}`);
            // call api
            // check params
            let response;
            if(typeof callback === 'undefined' && typeof params === 'function') {
                response = await axios.get(url);
            } else {
                response = await axios.get(url, { params: params });
            }
            // check if params given
            if(typeof callback === 'undefined' && typeof params === 'function') {
                callback = params;
            }
            // check response
            if(response.data.hasOwnProperty('error') && response.data.error !== null) {
                throw new ApiException(response.data.error, response.data.errorMessage);
            }
            // call back
            if(typeof callback === 'function') {
                callback(response);
            } else {
                console.warn('callback is not a valid function');
            }
        } catch(exception) {
            throw exception;
        } finally {
            // stop loading
            stopLoading(`GET${url}`);
        }
    };

    // post function
    const _post = async (url, payload, callback) => {
        try {
            // start loading
            startLoading(`POST${url}`);
            // call api
            const response = await axios.post(url, payload);
            // check response
            if(response.data.hasOwnProperty('error') && response.data.error !== null) {
                throw new ApiException(response.data.error, response.data.errorMessage);
            }
            // call back
            if(typeof callback === 'function') {
                callback(response);
            }
        } catch(exception) {
            throw exception;
        } finally {
            // stop loading
            stopLoading(`POST${url}`);
        }
    };

    // patch function
    const _patch = async (url, payload, callback) => {
        try {
            // start loading
            startLoading(`PATCH${url}`);
            // call api
            const response = await axios.patch(url, payload);
            // check response
            if(response.data.hasOwnProperty('error') && response.data.error !== null) {
                throw new ApiException(response.data.error, response.data.errorMessage);
            }
            // call back
            if(typeof callback === 'function') {
                callback(response);
            }
        } catch(exception) {
            throw exception;
        } finally {
            // stop loading
            stopLoading(`PATCH${url}`);
        }
    };

    // delete function
    const _delete = async (url, payload, callback) => {
        try {
            // start loading
            startLoading(`DELETE${url}`);
            // call api
            const response = await axios.delete(url, { data: payload });
            // check response
            if(response.data.hasOwnProperty('error') && response.data.error !== null) {
                throw new ApiException(response.data.error, response.data.errorMessage);
            }
            // call back
            if(typeof callback === 'function') {
                callback(response);
            }
        } catch(exception) {
            throw exception;
        } finally {
            // stop loading
            stopLoading(`DELETE${url}`);
        }
    };

    // return
    return {
        _get: _get,
        _post: _post,
        _patch: _patch,
        _delete: _delete,
    };
}
