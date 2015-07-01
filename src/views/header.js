import Marionette from 'backbone.marionette';
import header from '../templates/header.hbs';

export default class Header extends Marionette.LayoutView {

    constructor() {
        super({
            className: 'container-fluid'
        });
        this.delegateEvents(Header.getEvents());
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
        this.template = header({username: 'vania-pooh', clouds: clouds});
    }

    static getEvents() {
        return {
            'click button#add': 'onAddClicked',
            'click button#modify': 'onModifyClicked',
            'click button#delete': 'onDeleteClicked',
            'click li#access': 'onAccessClicked',
            'click li#quotas': 'onQuotasClicked',
            'click li#logout': 'onQuotasClicked'
        };
    }

    onAddClicked() {
        window.alert('Add button clicked');
    }

    onModifyClicked() {
        window.alert('Modify button clicked');
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