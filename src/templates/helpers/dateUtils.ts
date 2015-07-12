/// <reference path="../../../typings/tsd.d.ts"/>

import * as moment from 'moment';

/**
 * Returns humanized duration based on the difference between specified 
 * timestamp and current timestamp
 * @param timestamp
 * @returns humanized string
 */
export function humanizedDuration(timestamp) {
    let currentTimestamp = moment.valueOf();
    let duration = timestamp - currentTimestamp;
    return moment.duration(duration).humanize();
}