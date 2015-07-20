import * as Marionette from 'backbone.marionette';
import {App} from '../app';
import {Settings} from '../models/settings';
import {PanelView} from '../views/panel';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:panel');

export class PanelController extends Marionette.Object {

    showPanel() {
        logger.debug('Showing main panel');
        let settings = new Settings({
            clouds: [
                {
                    name: 'Openstack',
                    projects: [
                        {
                            name: 'mystack',
                            regions: [
                                {name: 'Europe', enabled: true},
                                {name: 'US West'}
                            ]
                        }
                    ]
                },
                {
                    name: 'Docker',
                    projects: [
                        {
                            name: 'docker',
                            regions: [
                                {name: 'test', enabled: true}
                            ]
                        }
                    ]
                }
            ]
        });
        let panelView = new PanelView(settings);
        App.instance.
            mainLayoutView.
            headerView.
            panel.show(panelView);
    }

}