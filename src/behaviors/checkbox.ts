import {BaseBehavior} from './base';

export class CheckboxBehavior extends BaseBehavior {

    constructor(options?: any, view?: any) {
        super(options, view);
        this.init();
    }

    public get checkedClass(): string {
        return this.getOption('checkedClass');
    }

    public get uncheckedClass() {
        return this.getOption('uncheckedClass');
    }

    private init() {
        this.ui = {
            el: this.selector
        };
        this.events = {
            'click @ui.el': 'toggleModel'
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
        let classToRemove = checked ?
            this.uncheckedClass :
            this.checkedClass;
        let classToAdd = checked ?
            this.checkedClass :
            this.uncheckedClass;
        this.toggleClasses(classToRemove, classToAdd);
    }
    
    private toggleClasses(classToRemove: string, classToAdd: string) {
        this.ui.el.addClass(classToAdd);
        this.ui.el.removeClass(classToRemove);
    }

    private toggleModel() {
        let checked = this.ui.el.hasClass(this.checkedClass);
        this.view.model.set(this.modelField, !checked);
    }

}