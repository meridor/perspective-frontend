import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';
import {Logger} from '../misc/logger';

let logger = new Logger('header');

export class HeaderView extends Marionette.LayoutView<Settings> {

    constructor() {
        let clouds = [
            {
                name: 'Openstack',
                projects: [
                    {
                        name: 'mystack',
                        regions: [
                            {name: 'Europe', enabled: true},
                            {name: 'US West'}
                        ]
                    }
                ]
            },
            {
                name: 'Docker',
                projects: [
                    {
                        name: 'docker',
                        regions: [
                            {name: 'test', enabled: true}
                        ]
                    }
                ]
            }
        ];
        let header = require('../templates/header.hbs');
        super({
            className: 'container-fluid',
            template: header({username: 'vania-pooh', clouds: clouds})
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

    onAddClicked() {
        logger.debug('Add button clicked');
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