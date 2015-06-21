import Marionette from 'backbone.marionette';
import mainLayout from './templates/mainLayout.hbs';
import 'bootstrap';

export default class MainLayout extends Marionette.LayoutView {
    constructor(...config) {
        super(...config);
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
        this.template = mainLayout({username: 'vania-pooh', clouds: clouds});
    }
    
}