import * as Marionette from 'backbone.marionette';
import * as Backbone from 'backbone';
import {MainLayoutView} from './views/mainLayout';
import {MainController} from './controllers/main';
import {Route} from './misc/routes';
import {Event} from './misc/events';
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
        routes[Route.LIST.name] = 'list';
        routes[Route.ADD.name] = 'add';
        return routes;
    }

}

export class App extends Marionette.Application {

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

    static go(route: Route, event: Event = new Event(route.name)) {
        App.navigate(route);
        App.instance.trigger(event.name);
    }

    initEventHandlers() {
        this.on(Event.LIST.name, () => mainController.list());
        this.on(Event.ADD.name, () => mainController.add());
    }

    renderMainLayout() {
        logger.debug('Rendering main application layout');
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


    trigger(eventName: string, ...args): any {
        logger.debug(`Firing event ${eventName} with arguments (${args})`);
        return super.trigger(eventName, args);
    }

    static navigate(route: Route) {
        logger.debug(`Navigating to route ${route}`);
        Backbone.history.navigate(route.name);
    }

    static startHistory(cb) {
        if (Backbone.history) {
            Backbone.history.start();
            cb();
        }
    }

}