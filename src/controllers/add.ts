import * as Marionette from 'backbone.marionette';
import {App} from '../app';
import {Settings, Projects, Project} from '../models/project';
import {AddPanelForm} from '../models/add';
import {AddPanel} from '../views/add/panel';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:panel');

export class AddController extends Marionette.Object {

    show() {
        logger.debug('Showing add panel');
        let formModel = new AddPanelForm();
        let addPanel = new AddPanel(formModel);
        App.instance.mainLayoutView.mainArea.show(addPanel);
    }

}