import * as Marionette from 'backbone.marionette';
import {InstancesController} from './instance';
import {PanelController} from './panel';
import {UserController} from './user';
import {AddController} from './add';

export class MainController extends Marionette.Object {

    private _instancesController: InstancesController;

    private _panelController: PanelController;

    private _userController: UserController;
    
    private _addController: AddController;

    constructor() {
        super();
        this._panelController = new PanelController();
        this._userController = new UserController();
        this._instancesController = new InstancesController();
        this._addController = new AddController();
    }

    list() {
        this.refreshHeader();
        this._instancesController.listInstances();
    }
    
    add() {
        this.refreshHeader();
        this._addController.show();
    }
    
    private refreshHeader() {
        this._panelController.showPanel();
        this._userController.showUserMenu();
    }

}
