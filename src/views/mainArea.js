import Marionette from 'backbone.marionette';
import mainArea from '../templates/mainArea.hbs';

export default class MainArea extends Marionette.LayoutView {

    constructor() {
        super({
            tagName: 'span'
        });
        this.template = mainArea();
    }
}
