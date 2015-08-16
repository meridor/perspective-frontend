import * as Marionette from 'backbone.marionette';
import {InstancesSection, InstancesGroup, Instance}
    from '../models/instance';
import {Image} from '../models/image';
import {Network} from '../models/settings';
import {InstancesSectionView} from '../views/instance';
import {App} from '../app';
import {Logger} from '../misc/logger';

let logger = new Logger('controller:instance');

export class InstancesController extends Marionette.Object {

    listInstances() {
        logger.debug('Listing instances');
        let runningInstances = new InstancesGroup('running', 'Running');
        setTimeout(() => {
            runningInstances.instances.reset([
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
        }, 2000);
        let stoppedInstances = new InstancesGroup('stopped', 'Stopped');
        setTimeout(() => {
            stoppedInstances.instances.reset([
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
        }, 4000);
        let errorInstances = new InstancesGroup('error', 'Error');
        let instancesSection = new InstancesSection([runningInstances, stoppedInstances, errorInstances]);
        let instancesSectionView = new InstancesSectionView(instancesSection);
        App.instance
            .mainLayoutView
            .mainAreaView
            .instances
            .show(instancesSectionView);
    }

}