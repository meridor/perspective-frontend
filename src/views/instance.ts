import * as Marionette from 'backbone.marionette';
import {Instance, Instances, InstancesGroup, InstancesSection} from '../models/instance';
import {Logger} from '../misc/logger';
import {CheckboxBehavior} from '../behaviors/checkbox';

let logger = new Logger('main');

class InstanceView extends Marionette.ItemView<Instance> {
    
    constructor(instance: Instance) {
        logger.debug(`Rendering ${instance}`);
        let instanceEntry = require('../templates/instance/instanceEntry.hbs');
        super({
            model: instance,
            tagName: 'tr',
            template: instanceEntry(instance.toJSON())
        });
    }

    get behaviors() {
        return {
            CheckboxBehavior: {
                behaviorClass: CheckboxBehavior,
                selector: 'input.selected',
                modelField: 'selected'
            }
        };
    }

}

class InstancesTableView extends Marionette.CompositeView<Instance> {
    
    constructor(instances: Instances) {
        let instancesTable = require('../templates/instance/instancesTable.hbs');
        super({
            tagName: 'table',
            className: 'table table-hover',
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

    private _instances: Marionette.Region;
    private _instancesTableView: InstancesTableView;
    
    constructor(group: InstancesGroup) {
        logger.debug(`Rendering instances group "${group.name}"`);
        let instancesGroup = require('../templates/instance/instancesGroup.hbs');
        super({
            className: 'panel panel-default',
            template: instancesGroup({
                id: group.id,
                name: group.name,
                count: group.count
            })
        });
        this.addRegions({
            instances: '.panel-body'
        });
        this._instancesTableView = new InstancesTableView(group.instances);
    }

    onRender() {
        this.instances.show(this.instancesTableView);
    }
    
    public get instances():Marionette.Region {
        return this._instances;
    }

    public set instances(value:Marionette.Region) {
        this._instances = value;
    }

    public get instancesTableView():InstancesTableView {
        return this._instancesTableView;
    }
}

export class InstancesSectionView extends Marionette.CompositeView<InstancesGroup> {

    constructor(section: InstancesSection) {
        logger.debug('Rendering instances section');
        let instancesSection = require('../templates/instance/instancesSection.hbs');
        super({
            className: 'panel panel-default',
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

