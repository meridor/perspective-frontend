import * as Marionette from 'backbone.marionette';
import {InstancesController} from './instance';
import {PanelController} from './panel';
import {UserController} from './user';

export class MainController extends Marionette.Object {

    private _instancesController: InstancesController;

    private _panelController: PanelController;

    private _userController: UserController;

    constructor() {
        super();
        this._panelController = new PanelController();
        this._userController = new UserController();
        this._instancesController = new InstancesController();
    }

    list() {
        this._panelController.showPanel();
        this._userController.showUserMenu();
        this._instancesController.listInstances();
    }

}
