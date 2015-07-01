import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import MainLayout from './views/mainLayout';

class MainController {

    list() {
        //window.alert('List instances, volumes and so on');
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
            'list': 'list'
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

    go(route, event = route) {
        App.navigate(route);
        this.trigger(event);
    }
    
    initEventHandlers() {
        this.on('list', () => mainController.list());
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