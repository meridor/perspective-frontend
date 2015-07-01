import Marionette from 'backbone.marionette';
import mainLayout from './../templates/mainLayout.hbs';
import Header from './header';
import MainArea from './mainArea';

export default class MainLayout extends Marionette.LayoutView {
    
    constructor() {
        super({el: '#application'});
        this.addRegion('header', '#header');
        this.addRegion('mainArea', '#mainArea');
        this.template = mainLayout();
    }
    
    onRender() {
        this.getRegion('header').show(new Header());
        this.getRegion('mainArea').show(new MainArea());
    }
    
}