import * as Marionette from 'backbone.marionette';
import {InstancesSection, InstancesGroup, Instance, Instances}
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
        let instancesFetcher = new Instances();
        let activeInstancesGroup = new InstancesGroup('in_progress', 'In progress');
        instancesFetcher.fetchByQuery(
            'state IN (' +
            '\'DELETING\', \'HARD_REBOOTING\', \'LAUNCHING\', \'MIGRATING\',' +
            ' \'PAUSING\', \'QUEUED\', \'REBOOTING\', \'REBUILDING\',' +
            ' \'RESIZING\', \'RESUMING\', \'HARD_REBOOTING\',' +
            ' \'SHUTTING_DOWN\', \'SNAPSHOTTING\', \'SUSPENDING\')',
            (instances: Instances) => activeInstancesGroup.instances.reset(instances.models),
            () => logger.error('Failed to load active instances')
        );

        let runningInstancesGroup = new InstancesGroup('running', 'Running');
        instancesFetcher.fetchByQuery(
            'state IN (\'LAUNCHED\')',
            (instances: Instances) => runningInstancesGroup.instances.reset(instances.models),
            () => logger.error('Failed to load running instances')
        );

        let stoppedInstancesGroup = new InstancesGroup('stopped', 'Stopped');
        instancesFetcher.fetchByQuery(
            'state IN (\'SHUTOFF\', \'PAUSED\', \'SUSPENDED\')',
            (instances: Instances) => stoppedInstancesGroup.instances.reset(instances.models),
            () => logger.error('Failed to load stopped instances')
        );

        let errorInstancesGroup = new InstancesGroup('error', 'Error');
        instancesFetcher.fetchByQuery(
            'state = \'ERROR\'',
            (instances: Instances) => errorInstancesGroup.instances.reset(instances.models),
            () => logger.error('Failed to load error instances')
        );

        let instancesSection = new InstancesSection([
            activeInstancesGroup, errorInstancesGroup,
            runningInstancesGroup, stoppedInstancesGroup
        ]);
        let instancesSectionView = new InstancesSectionView(instancesSection);
        App.instance
            .mainLayoutView
            .mainAreaView
            .instances
            .show(instancesSectionView);
    }

}