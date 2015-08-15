import * as Marionette from 'backbone.marionette';
import {Instance, Instances, InstancesGroup, InstancesSection} from '../models/instance';
import {Logger} from '../misc/logger';
import {CheckboxBehavior} from '../behaviors/checkbox';

let logger = new Logger('view:instance');

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
                selector: '.selected',
                modelField: 'selected',
                checkedClass: 'fa-check-square-o',
                uncheckedClass: 'fa-square-o'
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

class InstancesGroupTitleView extends Marionette.ItemView<InstancesGroup> {

    constructor(group: InstancesGroup) {
        let instancesGroupTitle = require('../templates/instance/instancesGroupTitle.hbs');
        super({
            tagName: 'span',
            model: group,
            template: instancesGroupTitle(group)
        });
    }

}

class InstancesGroupView extends Marionette.LayoutView<InstancesGroup> {

    private _instances: Marionette.Region;
    private _title: Marionette.Region;
    private _instancesTableView: InstancesTableView;
    private _noInstancesView: NoInstancesView;

    constructor(group: InstancesGroup) {
        let instancesGroup = require('../templates/instance/instancesGroup.hbs');
        super({
            className: 'panel panel-default',
            model: group,
            template: instancesGroup(group)
        });
        this.addRegions({
            title: '.panel-title a',
            instances: '.panel-body'
        });
        this._instancesTableView = new InstancesTableView(this.model.instances);
        this._noInstancesView = new NoInstancesView();
        this.model.bind('change', this.render);
    }

    onRender() {
        logger.debug(`Rendering instances group "${this.model.name}"`);
        let viewToShow = !this.model.isEmpty() ?
            this.instancesTableView :
            this.noInstancesView;
        this.instances.show(viewToShow);
        this.title.show(new InstancesGroupTitleView(this.model));
    }

    public get instances(): Marionette.Region {
        return this._instances;
    }

    public set instances(value: Marionette.Region) {
        this._instances = value;
    }

    public get title(): Marionette.Region {
        return this._title;
    }

    public set title(value: Marionette.Region) {
        this._title = value;
    }

    public get instancesTableView(): InstancesTableView {
        return this._instancesTableView;
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

