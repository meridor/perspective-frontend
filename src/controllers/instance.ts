import * as Marionette from 'backbone.marionette';
import {InstancesSection, InstancesGroup, Instance}
    from '../models/instance';
import {InstancesSectionView} from '../views/instance';
import App from '../app';

export class InstancesController extends Marionette.Object {
    
    listInstances() {
        let runningInstances = new InstancesGroup('running', 'Running', [
            new Instance({
                id: '123',
                name: 'test-instance',
                cloudType: 'Openstack',
                selected: true,
                image: {
                    name: 'cool-image'
                },
                keyName: 'test-key',
                state: 'running',
                lastModified: 1318874398806,
                log: true
            })
        ]);
        let instancesSection = new InstancesSection([runningInstances]);
        let instancesSectionView = new InstancesSectionView(instancesSection);
        App.instance
            .mainLayout
            .mainArea
            .getRegionManager()
            .getRegion('instances')
            .show(instancesSectionView);
    }
    
}