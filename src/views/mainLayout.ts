import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/project';
import {HeaderView} from './header';

export class MainLayoutView extends Marionette.LayoutView<Settings> {

    private _header: Marionette.Region;
    private _headerView: HeaderView;

    private _mainArea: Marionette.Region;

    constructor() {
        let mainLayout = require('../templates/mainLayout.hbs');
        super({
            el: '#application',
            template: mainLayout()
        });
        this.addRegions({
            header: '#header',
            mainArea: '#mainArea'
        });
        this._headerView = new HeaderView();
    }

    onRender() {
        this.header.show(this.headerView);
    }

    public get header(): Marionette.Region {
        return this._header;
    }

    public set header(value: Marionette.Region) {
        this._header = value;
    }

    public get mainArea(): Marionette.Region {
        return this._mainArea;
    }

    public set mainArea(value: Marionette.Region) {
        this._mainArea = value;
    }

    public get headerView(): HeaderView {
        return this._headerView;
    }

}