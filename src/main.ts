/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/templates.d.ts" />

import * as $ from 'jquery';
import App from './app';
import 'bootstrap';
import {Route as route} from './misc/routes';
import {Event as event} from './misc/events';

$(() => {
    let app = new App();
    
    app.on(event.START.name, () => {
        app.renderMainLayout();
        App.startHistory(() => {
            if (!App.currentRoute) {
                app.go(route.LIST.name);
            }
        });
    });
    
    app.start();
    
});