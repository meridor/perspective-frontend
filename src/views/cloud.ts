import * as Marionette from 'backbone.marionette';
import {Settings, Cloud, Clouds, Project} from '../models/settings';
import {CheckboxBehavior} from '../behaviors/checkbox';
import {Logger} from '../misc/logger';

let logger = new Logger('view:cloud');

export class CloudsDropdownView extends Marionette.CompositeView<Cloud> {

    constructor(clouds: Clouds) {
        let dropdown = require('../templates/cloud/dropdown.hbs');
        super({
            el: '#cloudsDropdown',
            collection: clouds,
            childView: CloudView,
            childViewContainer: '#clouds',
            template: dropdown()
        });
    }

    buildChildView(cloudOrProject: Cloud): Marionette.ItemView<Cloud> {
        return (cloudOrProject instanceof Project) ?
            new ProjectView(<Project> cloudOrProject) :
            new CloudView(cloudOrProject);
    }

}

export class CloudView extends Marionette.ItemView<Cloud> {

    constructor(cloud: Cloud) {
        logger.debug(`Rendering ${cloud}`);
        let cloudEntry = require('../templates/cloud/cloud.hbs');
        super({
            tagName: 'li',
            className: 'dropdown-header',
            model: cloud,
            template: cloudEntry(cloud.toJSON())
        });
    }

}

export class ProjectView extends Marionette.ItemView<Project> {

    constructor(project: Project) {
        logger.debug(`Rendering ${project}`);
        let projectEntry = require('../templates/cloud/project.hbs');
        super({
            tagName: 'li',
            model: project,
            template: projectEntry(project.toJSON())
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