import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/project';
import {Logger} from '../misc/logger';
import {Route as route} from '../misc/routes';
import {App} from '../app';

let logger = new Logger('view:header');

export class HeaderView extends Marionette.LayoutView<Settings> {

    private _panel: Marionette.Region;

    private _user: Marionette.Region;

    constructor() {
        let header = require('../templates/header.hbs');
        super({
            className: 'container-fluid',
            template: header()
        });
        this.addRegions({
            panel: '#panel',
            user: '#user'
        });
        this.delegateEvents(HeaderView.getEvents());
    }

    static getEvents() {
        return {
            'click button#add': 'onAddClicked',
            'click button#delete': 'onDeleteClicked',
            'click li#access': 'onAccessClicked',
            'click li#quotas': 'onQuotasClicked',
            'click li#logout': 'onQuotasClicked'
        };
    }

    public get panel(): Marionette.Region {
        return this._panel;
    }

    public set panel(value: Marionette.Region) {
        this._panel = value;
    }

    public get user(): Marionette.Region {
        return this._user;
    }

    public set user(value: Marionette.Region) {
        this._user = value;
    }

    onAddClicked() {
        logger.debug('Add button clicked');
        App.go(route.ADD);
    }

    onDeleteClicked() {
        logger.debug('Delete button clicked');
    }

    onAccessClicked(e) {
        e.preventDefault();
        logger.debug('Access popup is not implemented yet!');
    }

    onQuotasClicked(e) {
        e.preventDefault();
        logger.debug('Quotas popup is not implemented yet!');
    }

    onLogoutClicked(e) {
        e.preventDefault();
        logger.debug('Logout functionality is not implemented yet!');
    }
}