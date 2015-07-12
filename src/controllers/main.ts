import * as Marionette from 'backbone.marionette';
import {InstancesController} from './instance';

export class MainController extends Marionette.Object {
    
    private _instancesController: InstancesController;
    
    constructor() {
        super();
        this._instancesController = new InstancesController();
    }

    list() {
        this._instancesController.listInstances();
    }
    
}
