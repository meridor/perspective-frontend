import * as Marionette from 'backbone.marionette';
import {Instance, Instances, InstancesGroup, InstancesSection} from '../models/instance';
import {Logger} from '../misc/logger';
import {CheckboxBehavior} from '../behaviors/checkbox';

let logger = new Logger('view:instance');

class InstanceView extends Marionette.ItemView<Instance> {

    constructor(instance: Instance) {
        logger.debug(`Rendering ${instance}`);
        console.log(instance);
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

class NoInstancesView extends Marionette.ItemView<Instance> {

    constructor() {
        let noInstances = require('../templates/instance/noInstances.hbs');
        super({
            tagName: 'span',
            template: noInstances()
        });
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


    getEmptyView(): any {
        return new NoInstancesView();
    }
}

class InstancesGroupView extends Marionette.LayoutView<InstancesGroup> {

    private _instances: Marionette.Region;
    private _instancesTableView: InstancesTableView;
    private _noInstancesView: NoInstancesView;
    private _instancesGroup: InstancesGroup;

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
        this._noInstancesView = new NoInstancesView();
        this._instancesGroup = group;
    }

    onRender() {
        let viewToShow = !this.instancesGroup.isEmpty() ?
            this.instancesTableView :
            this.noInstancesView;
        this.instances.show(viewToShow);
    }

    public get instances(): Marionette.Region {
        return this._instances;
    }

    public set instances(value: Marionette.Region) {
        this._instances = value;
    }

    public get instancesTableView(): InstancesTableView {
        return this._instancesTableView;
    }

    public get instancesGroup(): InstancesGroup {
        return this._instancesGroup;
    }

    public get noInstancesView(): NoInstancesView {
        return this._noInstancesView;
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

