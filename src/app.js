import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import MainLayout from './mainLayout';

class MainController {

    listInstances() {
        window.alert('List instances!');
    }

}

let mainController = new MainController();

class Router extends Marionette.AppRouter {
    
    constructor() {
        super({
            appRoutes: Router.getRoutes(),
            controller: mainController
        });
    }
    
    static getRoutes() {
        return {
            'listInstances': 'listInstances'
        };
    }

}

export default class App extends Marionette.Application {

    constructor() {
        super();
        this.addInitializer(
            () => new Router()
        );
        this.initEventHandlers();
    }

    initEventHandlers() {
        this.on('instances:list', () => mainController.listInstances());
    }
    
    static renderMainLayout() {
        new MainLayout().render();
    }
    
    static getCurrentRoute() {
        return Backbone.history.fragment;
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