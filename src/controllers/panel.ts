import * as Marionette from 'backbone.marionette';
import {App} from '../app';
import {Settings, Clouds, Cloud, Project} from '../models/settings';
import {PanelView} from '../views/panel';
import {CloudsDropdownView} from '../views/cloud';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:panel');

export class PanelController extends Marionette.Object {

    showPanel() {
        logger.debug('Showing main panel');
        let settings = new Settings();
        let panelView = new PanelView(settings);
        App.instance.
            mainLayoutView.
            headerView.
            panel.show(panelView);

        let clouds: Clouds = new Clouds([
            new Cloud('Openstack'),
            new Project('mystack', 'Europe'),
            new Project('mystack', 'US West'),
            new Cloud('Docker'),
            new Project('docker-test', '', true)
        ]);

        let cloudsDropdownView = new CloudsDropdownView(clouds);
        cloudsDropdownView.render();
    }

}