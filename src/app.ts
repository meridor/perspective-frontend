import * as Marionette from 'backbone.marionette';
import * as Backbone from 'backbone';
import {MainLayout} from './views/mainLayout';
import {MainController} from './controllers/main';
import {Event as event} from './misc/events';

let mainController = new MainController();

class Router extends Marionette.AppRouter implements Marionette.AppRouterOptions {

    constructor() {
        super({
            routes: {}, //No Backbone routes yet
            appRoutes: Router.getRoutes(),
            controller: mainController
        });
    }

    static getRoutes() {
        let routes = {};
        routes[event.LIST.name] = 'list';
        return routes;
    }

}

export default class App extends Marionette.Application {
    
    private static _instance: App;
    
    private _mainLayout: MainLayout;
    
    constructor() {
        super();
        this.addInitializer(
            () => new Router()
        );
        this.initEventHandlers();
        this.mainLayout = new MainLayout();
        App._instance = this;
    }

    go(route, event = route) {
        App.navigate(route);
        this.trigger(event);
    }
    
    initEventHandlers() {
        this.on(event.LIST.name, () => mainController.list());
    }
    
    renderMainLayout() {
        this.mainLayout.render();
    }
    
    static get instance() {
        return App._instance;
    }

    get mainLayout() {
        return this._mainLayout;
    }

    set mainLayout(value) {
        this._mainLayout = value;
    }

    static get currentRoute() {
        return Backbone.history.getFragment;
    }
    
    static navigate(route) {
        Backbone.history.navigate(route);
    }
    
    static startHistory(cb) {
        if (Backbone.history) {
            Backbone.history.start();
            cb();
        }
    }
    
}