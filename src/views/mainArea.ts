import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';

export class MainArea extends Marionette.LayoutView<Settings> {

    constructor() {
        let mainArea = require('../templates/mainArea.hbs');
        super({
            tagName: 'div',
            className: 'row',
            template: mainArea()
        });
        this.addRegions({
            instances: '#instancesSection',
            images: '#imagesSection'
        });
    }
}
