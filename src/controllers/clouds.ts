import * as Marionette from 'backbone.marionette';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:clouds');

export class CloudsController extends Marionette.Object {

    listClouds() {
        logger.debug('Listing projects and regions');
    }

}