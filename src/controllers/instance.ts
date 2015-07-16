import * as Marionette from 'backbone.marionette';
import {InstancesSection, InstancesGroup, Instance}
    from '../models/instance';
import {Image} from '../models/image';
import {Network} from '../models/network';
import {InstancesSectionView} from '../views/instance';
import App from '../app';
import {Logger} from '../misc/logger';

let logger = new Logger('header');

export class InstancesController extends Marionette.Object {
    
    listInstances() {
        logger.debug(`Listing instances`);
        let runningInstances = new InstancesGroup('running', 'Running', [
            new Instance({
                id: '123',
                name: 'running-instance',
                cloudType: 'Openstack',
                selected: true,
                image: new Image({
                    id: 'image-id',
                    name: 'cool-image'
                }),
                network: new Network({
                    id: '431',
                    name: 'SOMENETWORK'
                }),
                keyName: 'test-key',
                state: 'running',
                lastModified: 1318874398806,
                log: true
            })
        ]);
        let stoppedInstances = new InstancesGroup('stopped', 'Stopped', [
            new Instance({
                id: '222',
                name: 'stopped-instance',
                cloudType: 'Docker',
                image: {
                    name: 'another-image'
                },
                keyName: 'some-key',
                state: 'shutoff',
                lastModified: 1318874398333,
                log: true
            })
        ]);
        let instancesSection = new InstancesSection([runningInstances, stoppedInstances]);
        let instancesSectionView = new InstancesSectionView(instancesSection);
        App.instance
            .mainLayoutView
            .mainAreaView
            .instances
            .show(instancesSectionView);
    }
    
}