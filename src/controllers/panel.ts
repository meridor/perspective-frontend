import * as Marionette from 'backbone.marionette';
import {App} from '../app';
import {Settings, Projects, Project} from '../models/settings';
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
        let projects = new Projects();
        let that = this;
        projects.fetch({
            success: function (loadedProjects: Projects) {
                logger.debug('Rendering projects dropdown');
                PanelController.showCloudsDropdown(loadedProjects);
            },
            error: function () {
                logger.debug('Failed to load projects list');
            }
        });
    }

    private static showCloudsDropdown(projects: Projects) {
        let cloudsDropdownView = new CloudsDropdownView(projects);
        cloudsDropdownView.render();
    }

}