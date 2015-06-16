import Marionette from '../node_modules/backbone.marionette';

export default class MainLayout extends Marionette.LayoutView {
    constructor(...rest) {
        super(...rest);
        //this.template = Perspective.templates.layout;
    }
}