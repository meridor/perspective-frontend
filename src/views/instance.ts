import * as Marionette from 'backbone.marionette';
import {Instance, Instances, InstancesGroup, InstancesGroups, InstancesSection} from '../models/instance';
import {Logger} from '../misc/logger';
import {CheckboxBehavior} from '../behaviors/checkbox';
import {Event as event} from '../misc/events';

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
        this.model.bind(event.INSTANCE_GROUP_CHANGE.name, this.render);
    }

    onRender() {
        logger.debug(`Rendering instances group "${this.model.name}"`);
        this.title.show(new InstancesGroupTitleView(this.model));
        let viewToShow = !this.model.isEmpty() ?
            new InstancesTableView(this.model.instances) :
            new NoInstancesView();
        this.instances.show(viewToShow);
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

}

class InstancesGroupCollectionView extends Marionette.CollectionView<InstancesGroup> {
    
    constructor(groups: InstancesGroups) {
        let instancesSection = require('../templates/instance/instancesSection.hbs');
        super({
            tagName: 'span',
            collection: groups,
            childView: InstancesGroupView
        });
    }

    buildChildView(group: InstancesGroup) {
        return new InstancesGroupView(group);
    }
    
}

class InstancesSectionTitleView extends Marionette.ItemView<InstancesSection> {

    constructor(section: InstancesSection) {
        let instancesSectionTitle = require('../templates/instance/instancesSectionTitle.hbs');
        super({
            tagName: 'span',
            model: section,
            template: instancesSectionTitle(section)
        });
    }

}

export class InstancesSectionView extends Marionette.LayoutView<InstancesSection> {

    private _title: Marionette.Region;
    private _groups: Marionette.Region;

    constructor(section: InstancesSection) {
        let instancesSection = require('../templates/instance/instancesSection.hbs');
        super({
            className: 'panel panel-default',
            model: section,
            template: instancesSection()
        });
        this.addRegions({
            title: '.panel-title a',
            groups: '.panel-body'
        });
        this.model.groups.forEach(gr => gr.bind(event.INSTANCE_GROUP_CHANGE.name, this.refreshTitle, this));
    }

    onRender() {
        logger.debug(`Rendering instances section`);
        this.refreshTitle();
        this.groups.show(new InstancesGroupCollectionView(this.model.groups));
    }
    
    refreshTitle() {
        logger.debug(`Current instances section count = ${this.model.count}`);
        this.title.show(new InstancesSectionTitleView(this.model));
    }

    public get title(): Marionette.Region {
        return this._title;
    }

    public set title(value: Marionette.Region) {
        this._title = value;
    }

    public get groups(): Marionette.Region {
        return this._groups;
    }

    public set groups(value: Marionette.Region) {
        this._groups = value;
    }
}

