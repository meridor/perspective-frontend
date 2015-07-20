import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';
import {Logger} from '../misc/logger';

let logger = new Logger('view:panel');

export class PanelView extends Marionette.LayoutView<Settings> {

    constructor(settings: Settings) {
        let panel = require('../templates/panel.hbs');
        super({
            tagName: 'ul',
            className: 'nav navbar-nav',
            model: settings,
            template: panel(settings.toJSON())
        });
    }
}
