import Application from './app';
import MainLayout from './mainLayout';
import $ from 'jquery';
import Backbone from 'backbone';

$(() => {
    'use strict';
    let app = new Application();
    
    app.on('start', function() {
        app.rootLayout = new MainLayout({el: '#application'});
        app.rootLayout.render();
        Backbone.history.start();
    });
    
    app.start();
    
});