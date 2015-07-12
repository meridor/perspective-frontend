import * as Marionette from 'backbone.marionette';
import {Settings} from '../models/settings';
import mainLayout from '../templates/mainLayout.hbs';
import {Header} from './header';
import {MainArea} from './mainArea';

export class MainLayout extends Marionette.LayoutView<Settings> {
    
    private _header: Header;
    
    private _mainArea: MainArea;
    
    constructor() {
        super({
            el: '#application',
            template: mainLayout()
        });
        this.addRegions({
            header: '#header',
            mainArea: '#mainArea'
        });
        this._mainArea = new MainArea();
        this._header = new Header();
    }
    
    onRender() {
        this.getRegionManager().getRegion('header').show(this.header);
        this.getRegionManager().getRegion('mainArea').show(this.mainArea);
    }
    
    get header() {
        return this._header;
    }
    
    get mainArea() {
        return this._mainArea;
    }
    
}