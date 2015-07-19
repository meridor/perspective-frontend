import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';

export class MainAreaView extends Marionette.LayoutView<Settings> {

    private _instances: Marionette.Region;
    private _images: Marionette.Region;

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

    public get instances(): Marionette.Region {
        return this._instances;
    }

    public set instances(value: Marionette.Region) {
        this._instances = value;
    }

    public get images(): Marionette.Region {
        return this._images;
    }

    public set images(value: Marionette.Region) {
        this._images = value;
    }
}
