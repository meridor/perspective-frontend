import * as Marionette from 'backbone.marionette';
import * as Backbone from 'backbone';
import {MainLayoutView} from './views/mainLayout';
import {MainController} from './controllers/main';
import {Event as event} from './misc/events';
import {Logger} from './misc/logger';

let logger = new Logger('app');

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
    
    private _mainLayoutView: MainLayoutView;
    
    constructor() {
        super();
        this.addInitializer(
            () => new Router()
        );
        this.initEventHandlers();
        this.mainLayoutView = new MainLayoutView();
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
        logger.debug('Rending main application layout');
        this.mainLayoutView.render();
    }
    
    static get instance() {
        return App._instance;
    }

    get mainLayoutView() {
        return this._mainLayoutView;
    }

    set mainLayoutView(value) {
        this._mainLayoutView = value;
    }

    static get currentRoute() {
        return Backbone.history.getFragment();
    }


    trigger(eventName:string, ...args):any {
        logger.debug(`Firing event ${eventName} with arguments (${args})`);
        return super.trigger(eventName, args);
    }

    static navigate(route) {
        logger.debug(`Navigating to route ${route}`);
        Backbone.history.navigate(route);
    }
    
    static startHistory(cb) {
        if (Backbone.history) {
            Backbone.history.start();
            cb();
        }
    }
    
}