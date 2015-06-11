import Application from './app';
import MainLayout from './mainLayout';
import $ from '../node_modules/jquery';
import Backbone from '../node_modules/backbone';

$(() => {
    'use strict';
    let app = new Application();
    
    app.on('start', function() {
        app.rootLayout = new MainLayout({el: '.app'});
        app.rootLayout.render();
        Backbone.history.start();
    });
    
    app.start();
    
});