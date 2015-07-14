/// <reference path="../typings/tsd.d.ts" />

import * as $ from 'jquery';
import App from './app';
import 'bootstrap';
import {Route as route} from './misc/routes';
import {Event as event} from './misc/events';
import {Logger} from './misc/logger';

let logger = new Logger('main');

$(() => {

    try {
        logger.info("Initializing application");
        let app = new App();

        app.on(event.START.name, () => {
            app.renderMainLayout();
            App.startHistory(() => {
                logger.debug(`Current route is ${App.currentRoute}`);
                if (!App.currentRoute) {
                    app.go(route.LIST.name);
                }
            });
        });

        app.start();
    } catch (e) {
        logger.error(e);
    }
    
});