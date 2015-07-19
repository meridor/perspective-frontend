import * as Marionette from 'backbone.marionette';

export class BaseBehavior extends Marionette.Behavior {

    private _ui;

    private _events;

    private _modelEvents;

    constructor(options:any, view:any) {
        super(options, view);
    }

    public get modelField():string {
        return this.getOption('modelField');
    }

    public get selector() {
        return this.getOption('selector');
    }

    public get ui() {
        return this._ui;
    }

    public set ui(ui) {
        this._ui = ui;
    }

    public get events() {
        return this._events;
    }

    public set events(events) {
        this._events = events;
    }

    public get modelEvents() {
        return this._modelEvents;
    }

    public set modelEvents(modelEvents) {
        this._modelEvents = modelEvents;
    }

}