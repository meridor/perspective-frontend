import * as Marionette from 'backbone.marionette';
import {App} from '../../app';
import {AddPanelForm} from '../../models/add';
import {Project} from '../../models/project';
import {BaseModal} from '../base';

export class AddPanel extends Marionette.LayoutView<AddPanelForm> {
    
    constructor(model: AddPanelForm) {
        let panel = require('../../templates/add/panel.hbs');
        super({
            model,
            template: panel()
        });
        this.delegateEvents({
            'click button#add': 'add',
            'click button#cancel': 'cancel'
        });
    }
    
    //TODO: add click handlers
    
}

// Useless for the moment, to be continued...
export class AddModal extends BaseModal<Project> {

    constructor(project: Project) {
        let template = require('../../templates/add/modal.hbs');
        super(project, template, 'addWindowLabel');
    }

}
