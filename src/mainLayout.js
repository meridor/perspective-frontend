import Marionette from '../node_modules/backbone.marionette';
import mainLayout from './templates/layout.hbs';

export default class MainLayout extends Marionette.LayoutView {
    constructor(...rest) {
        super(...rest);
        this.template = mainLayout;
    }
}