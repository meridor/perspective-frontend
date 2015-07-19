import {BaseBehavior} from './base';

export class CheckboxBehavior extends BaseBehavior {

    constructor(options?: any, view?: any) {
        super(options, view);
        this.init();
    }
    
    private init() {
        this.ui = {
            el: this.selector
        };
        this.events = {
            'change @ui.el': 'updateModel'
        };
        let modelEvents = {};
        modelEvents[`change:${this.modelField}`] = 'updateView';
        this.modelEvents = modelEvents;
    }
    
    onRender() {
        this.updateView();
    }

    private updateView() {
        let checked = !!this.view.model.get(this.modelField);
        this.ui.el.prop('checked', checked);
    }

    private updateModel() {
        let checked = this.ui.el.is(':checked');
        this.view.model.set(this.modelField, checked);
    }

}