import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';
import mainArea from '../templates/mainArea.hbs';

export class MainArea extends Marionette.LayoutView<Settings> {

    constructor() {
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
