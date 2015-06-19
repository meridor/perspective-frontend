import Marionette from 'backbone.marionette';
import mainLayout from './templates/layout.hbs';
import 'bootstrap';

export default class MainLayout extends Marionette.LayoutView {
    constructor(...config) {
        super(...config);
        this.template = mainLayout({username: 'vania-pooh'});
    }
}