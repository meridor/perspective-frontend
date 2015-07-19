import * as Marionette from 'backbone.marionette';
import {Logger} from '../misc/logger';

let logger = new Logger('header');

export class CloudsController extends Marionette.Object {

    listProjects() {
        logger.debug('Listing projects and regions');
    }

}