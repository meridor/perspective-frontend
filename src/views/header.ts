import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';
import header from '../templates/header.hbs';

export class Header extends Marionette.LayoutView<Settings> {

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
        super({
            className: 'container-fluid',
            template: header({username: 'vania-pooh', clouds: clouds})
        });
        this.delegateEvents(Header.getEvents());
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
        window.alert('Add button clicked');
    }

    onDeleteClicked() {
        window.alert('Delete button clicked');
    }

    onAccessClicked(e) {
        e.preventDefault();
        window.alert('Access popup is not implemented yet!');
    }

    onQuotasClicked(e) {
        e.preventDefault();
        window.alert('Quotas popup is not implemented yet!');
    }

    onLogoutClicked(e) {
        e.preventDefault();
        window.alert('Logout functionality is not implemented yet!');
    }
}