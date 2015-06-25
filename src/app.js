import Marionette from 'backbone.marionette';

class MainController {

    listInstances() {
        window.alert('List instances!');
    }

}

class Router extends Marionette.AppRouter {
    
    constructor() {
        let config = {};
        config.appRoutes = Router.getRoutes();
        config.controller = new MainController();
        super(config);
    }
    
    static getRoutes() {
        return {
            'listInstances': 'listInstances'
        };
    }

}

export default class Application extends Marionette.Application {

    constructor() {
        super();
        this.addInitializer(
            () => new Router()
        );
    }
    
}

