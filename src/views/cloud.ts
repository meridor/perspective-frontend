import * as Marionette from 'backbone.marionette';
import {Settings, Projects, Project} from '../models/settings';
import {CheckboxBehavior} from '../behaviors/checkbox';
import {Logger} from '../misc/logger';

let logger = new Logger('view:cloud');

export class CloudsDropdownView extends Marionette.CompositeView<Project> {

    constructor(projects: Projects) {
        let dropdown = require('../templates/cloud/dropdown.hbs');
        super({
            el: '#cloudsDropdown',
            collection: projects,
            childView: ProjectView,
            childViewContainer: '#clouds',
            template: dropdown()
        });
    }

    buildChildView(project: Project): Marionette.ItemView<Project> {
        return new ProjectView(project);
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