import * as Marionette from 'backbone.marionette';
import {Instance, Instances, InstancesGroup, InstancesSection} from '../models/instance';
import instancesSection from '../templates/instance/instancesSection.hbs';
import instancesGroup from '../templates/instance/instancesGroup.hbs';
import instancesTable from '../templates/instance/instancesTable.hbs';
import instanceEntry from '../templates/instance/instanceEntry.hbs';

class InstanceView extends Marionette.ItemView<Instance> {
    
    constructor(instance: Instance) {
        super({
            tagName: 'tr',
            template: instanceEntry(instance)
        });
    }
    
}

class InstancesTableView extends Marionette.CompositeView<Instance> {
    
    constructor(instances: Instances) {
        super({
            className: 'panel panel-default',
            collection: instances,
            childView: InstanceView,
            childViewContainer: 'tbody',
            template: instancesTable()
        });
    }
    
    buildChildView(instance: Instance): InstanceView {
        return new InstanceView(instance);
    }
    
}

class InstancesGroupView extends Marionette.LayoutView<InstancesGroup> {

    private _instancesTable: InstancesTableView;
    
    constructor(group: InstancesGroup) {
        super({
            template: instancesGroup({
                id: group.id,
                name: group.name,
                count: group.count
            })
        });
        this.addRegions({
            instances: '.panel-body'
        });
        this._instancesTable = new InstancesTableView(group.instances);
    }


    onRender() {
        super.onRender();
        this.getRegionManager().getRegion('instances').show(this.instancesTable);
    }

    public get instancesTable():InstancesTableView {
        return this._instancesTable;
    }
}

export class InstancesSectionView extends Marionette.CompositeView<InstancesGroup> {

    constructor(section: InstancesSection) {
        super({
            collection: section.groups,
            childView: InstancesTableView,
            childViewContainer: '#instancesGroups',
            template: instancesSection({count: section.count})
        });
    }
    
    buildChildView(group: InstancesGroup) {
        return new InstancesGroupView(group);
    }
    
}

