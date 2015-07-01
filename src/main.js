import $ from 'jquery';
import App from './app';
import 'bootstrap';

$(() => {
    let app = new App();
    
    app.on('start', () => {
        App.renderMainLayout();
        App.startHistory(() => {
            if (!App.getCurrentRoute()) {
                app.go('list');
            }
        });
    });
    
    app.start();
    
});